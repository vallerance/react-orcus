import { Selector, Slice } from '@reduxjs/toolkit';
import { attr, OrmState, QuerySet, RefPropOrSimple } from 'redux-orm';

import { createSelector, Model, ModelType, Orm, Schema } from './Model';
import type OrcusApp from './OrcusApp';

const ormType = () => new Orm<Schema>();
type OrmInstance = ReturnType<typeof ormType>;

export class Desktop extends Model<
    typeof Desktop,
    {
        id: string;
        _focusedApps: string[];
    }
> {
    static override modelName = 'Desktop';

    static override fields = {
        // relational accessors
        // - apps: OrcusApp.desktop.apps
        // non-relational fields
        // component props
        id: attr(), //number, required
        // model props
        // a list of app slugs that is the focus queue
        // an app may be closed by still listed in the focus queue
        _focusedApps: attr(), //array
    };

    static override options = {
        idAttribute: 'id',
    };

    static defaultProps = {
        id: '0',
        _focusedApps: null,
    };

    //return an initial state object that is derived from some component props
    static getInitialStateFromProps(props: typeof this.defaultProps) {
        return Object.fromEntries(
            Object.entries(
                Object.assign({}, Desktop.defaultProps, props, {
                    id: window.crypto.randomUUID(),
                    _focusedApps: [],
                })
            ).filter(it => it[0] in Desktop.fields)
        );
    }

    // SELECTORS
    static select = {} as {
        desktop: Selector<OrmState<Schema>, Desktop>;
        singleDesktop: Selector<OrmState<Schema>, Desktop>;
        focusedAppSlug: Selector<OrmState<Schema>, string>;
        focusIndex: Selector<OrmState<Schema>, number>;
    };

    static createSelectors(orm: OrmInstance) {
        Desktop.select.desktop = createSelector(orm.Desktop);
        Desktop.select.singleDesktop = createSelector(
            orm.Desktop,
            function (desktops: Desktop[]) {
                if (desktops.length !== 1) {
                    throw new Error(
                        `Expected session to contain exactly one desktop instance, but found ${desktops.length}.`
                    );
                }
                return desktops[0];
            }
        );
        Desktop.select.focusedAppSlug = createSelector(
            (
                orm.Desktop as unknown as {
                    _focusedApps: string[];
                }
            )._focusedApps,
            function (slugs: string[]) {
                // the first app will be the focused app
                return slugs[0];
            }
        );
        // requires extra third argument: appSlug
        // returns 1-indexed focus index of app
        Desktop.select.focusIndex = createSelector(
            (
                orm.Desktop as unknown as {
                    _focusedApps: string[];
                }
            )._focusedApps,
            (state: unknown, id: unknown, appSlug: string) => appSlug,
            function (slugs: string[], appSlug: string) {
                // return index (1 indexed) of slug
                return slugs.indexOf(appSlug) + 1;
            }
        );
    }

    // REDUCER
    static slice: Slice<ModelType<typeof Desktop>> = this.createSlice({
        name: 'DesktopSlice',
        initialState: undefined as unknown as ModelType<typeof Desktop>,
        reducers: {
            focusApp(Desktop, action) {
                Desktop.requireId(action.payload.id).focusApp(
                    action.payload.slug
                );
            },
            blurApp(Desktop, action) {
                Desktop.requireId(action.payload.id).blurApp(
                    action.payload.slug
                );
            },
            createDesktop(Desktop, action) {
                Desktop.create(
                    Object.assign({}, Desktop.defaultProps, action.payload)
                );
            },
            updateDesktopProp(Desktop, action) {
                Desktop.requireId(action.payload.id).set(
                    action.payload.prop,
                    action.payload.value
                );
            },
            updateDesktop(Desktop, action) {
                Desktop.requireId(action.payload.id).update(
                    action.payload.props
                );
            },
            destroyDesktop(Desktop, action) {
                Desktop.requireId(action.payload.id).delete();
            },
        },
    });

    // track when the focus of our apps is changed from the initial setting
    #focusUpdated = false;

    override toString() {
        return `Desktop: ${(this as unknown as { id: string }).id}`;
    }

    // removes slug from focus queue and re-adds it using the provided method
    #updateFocusQueue(
        appSlug: string,
        method: (this: unknown[], el: unknown) => unknown
    ) {
        if (typeof method != 'function') {
            throw new Error(
                `Desktop.__updateFocusQueue(): invalid array prototype method: ${String(
                    method
                )}.`
            );
        }
        // first search for this app in the focus queue
        const queue = (
            this as unknown as { _focusedApps: string[] }
        )._focusedApps.slice();
        const index = queue.indexOf(appSlug);
        // if our slug is already in the queue
        if (index >= 0) {
            //remove it from it's current place
            queue.splice(index, 1);
        }
        // update the given app's focus by apply method to queue
        method.call(queue, appSlug);
        // update queue
        this.set(
            '_focusedApps',
            queue as RefPropOrSimple<this, '_focusedApps'>
        );
    }

    /**
     * Focus the given app (bluring the existing focused app).
     * @param {string} appSlug - the identifier of the app to focus
     */
    focusApp(appSlug: string) {
        // track this focus update
        this.#focusUpdated = true;
        this.#updateFocusQueue(appSlug, Array.prototype.unshift);
    }

    /**
     * Blur the given app by altering its place in the focus queue.
     * This will leave the next app focused.
     * @param {string} appSlug - the identifier of the app to blur
     */
    blurApp(appSlug: string) {
        // track this focus update
        this.#focusUpdated = true;
        // if this app isn't currently focused
        if (
            (
                this as unknown as { _focusedApps: string[] }
            )._focusedApps.indexOf(appSlug) !== 0
        ) {
            // then it is already blurred isn't it
            return;
        } // else, the app is focused

        /*
         * There has been some back and forth as to how blur should work:
         *
         */

        /*
         * This sends it back one space in the queue:
         */
        //blur the app using custom method
        this.#updateFocusQueue(appSlug, function (slug) {
            return this.splice(1, 0, slug);
        });
        /**/

        /*
         * This sends it to the end of the queue:
         *
        //blur the app
        this.#updateFocusQueue(appSlug, Array.prototype.push);
         */
    }

    /**
     * Blur the given app by removing its focus state entirely.
     * Like blurApp(), this will leave the next app focused.
     * @param {string} appSlug - the identifier of the app to blur
     */
    removeAppFocus(appSlug: string) {
        // track this focus update
        this.#focusUpdated = true;
        //blur the app
        this.#updateFocusQueue(appSlug, function () {
            // empty
        });
    }

    #getIndexedApps() {
        return Object.fromEntries(
            (this as unknown as Desktop & { apps: QuerySet<OrcusApp> }).apps
                .toModelArray()
                .map(it => [it.slug, it])
        );
    }

    /**
     * Update extra desktop-level props when an app is created.
     * @param {string} appSlug - the identifier of the app to register
     */
    registerApp(appSlug: string) {
        // if our focus has been updated
        if (this.#focusUpdated) {
            // then just add our app to the end of the focus queue
            this.#updateFocusQueue(appSlug, Array.prototype.push);
            // there is nothing more to do
            return;
        } // else, we should pay attention to the initial focused property
        // get indexed apps
        const indexedApps = this.#getIndexedApps(),
            // sort keys into new queue
            newQueue = Object.keys(indexedApps).sort((a, b) => {
                return (
                    indexedApps[a].initialFocused -
                    indexedApps[b].initialFocused
                );
            });
        // update queue
        this.set(
            '_focusedApps',
            newQueue as RefPropOrSimple<this, '_focusedApps'>
        );
    }

    /**
     * Remove extra desktop-level info when an app is destroyed.
     * @param {string} appSlug - the identifier of the app to deregister
     */
    deregisterApp(appSlug: string) {
        // remove this app from our focus queue
        this.#updateFocusQueue(appSlug, function () {
            // empty
        });
    }
}

//export Desktop class
export default Desktop;
//export actions
export const {
    focusApp,
    blurApp,
    createDesktop,
    updateDesktopProp,
    updateDesktop,
    destroyDesktop,
} = Desktop.slice.actions;
