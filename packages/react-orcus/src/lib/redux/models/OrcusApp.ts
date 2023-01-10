import { Selector, Slice } from '@reduxjs/toolkit';
import { attr, fk } from 'redux-orm';
import { OrmState } from 'redux-orm/ORM';

import type { Desktop } from './Desktop';
import { createSelector, Model, ModelType, Orm, Schema } from './Model';

const DEFAULT_ID = 'ORCUS_APP_DEFAULT_ID_VALUE_68142';

const ormType = () => new Orm<Schema>();
type OrmInstance = ReturnType<typeof ormType>;

//create our OrcusApp model
export class OrcusApp extends Model<
    typeof OrcusApp,
    {
        slug: string;
        id: string;
        icon: string;
        initialFocused: number;
        name: string;
        opened: boolean;
        minimized: boolean;
        desktop: string;
    }
> {
    static override modelName = 'OrcusApp';

    static override fields = {
        // non-relational fields
        // component props
        slug: attr(), //string, required
        id: attr(),
        icon: attr(),
        initialFocused: attr(),
        name: attr(),
        opened: attr(), //bool
        minimized: attr(), //bool
        desktop: fk('Desktop', 'apps'),
    };

    static override options = {
        idAttribute: 'slug',
    };

    static defaultProps = {
        id: DEFAULT_ID,
        icon: 'fa:home',
        initialFocused: Infinity,
        initialOpened: false,
        name: '',
        opened: false,
        minimized: false,
    };

    //return an initial state object that is derived from some component props
    static getInitialStateFromProps(
        props: Omit<typeof this.defaultProps, 'initialFocused'> & {
            initialFocused: number | boolean;
        }
    ) {
        // transform initialFocused
        let initialFocused = Number(props.initialFocused);
        if (initialFocused <= 0) {
            initialFocused = Infinity;
        }
        return Object.fromEntries(
            Object.entries(
                Object.assign({}, OrcusApp.defaultProps, props, {
                    initialFocused,
                    opened: props.initialOpened,
                })
            ).filter(it => it[0] in OrcusApp.fields)
        );
    }

    // SELECTORS
    static select = {} as {
        app: Selector<OrmState<Schema>, OrcusApp>;
        appSlug: Selector<OrmState<Schema>, string[]>;
    };

    static createSelectors(orm: OrmInstance) {
        OrcusApp.select.app = createSelector(orm.OrcusApp);
        OrcusApp.select.appSlug = createSelector(
            (orm.OrcusApp as unknown as { slug: string }).slug
        );
    }

    // REDUCER
    static slice: Slice<ModelType<typeof OrcusApp>> = this.createSlice({
        name: 'OrcusAppSlice',
        initialState: undefined as unknown as ModelType<typeof OrcusApp>,
        reducers: {
            createApp(App, action) {
                // get desktop
                const session = (App as unknown as { session: OrmInstance })
                        .session,
                    desktop = (
                        session.Desktop as unknown as typeof Desktop
                    ).select.singleDesktop(
                        session as unknown as OrmState<Schema>
                    ),
                    // create app
                    app = App.create(
                        Object.assign(
                            {
                                desktop: (desktop as unknown as { id: string })
                                    .id,
                            },
                            OrcusApp.defaultProps,
                            action.payload
                        )
                    );
                // register app
                (
                    app as unknown as OrcusApp & { desktop: Desktop }
                ).desktop.registerApp(action.payload.slug);
            },
            updateAppProp(App, action) {
                App.requireId(action.payload.slug).set(
                    action.payload.prop,
                    action.payload.value
                );
            },
            updateApp(App, action) {
                App.requireId(action.payload.slug).update(action.payload.props);
            },
            openApp(App, action) {
                // get our app
                const app = App.requireId(action.payload.slug);
                // open it
                app.set('opened', true);
                // focus it
                app.desktop.focusApp(action.payload.slug);
            },
            closeApp(App, action) {
                // get our app
                const app = App.requireId(action.payload.slug);
                // close it
                app.set('opened', false);
                // blur it
                app.desktop.removeAppFocus(action.payload.slug);
            },
            minimizeApp(App, action) {
                // get our app
                const app = App.requireId(action.payload.slug);
                // minimize it it
                app.set('minimized', true);
                // blur it
                app.desktop.removeAppFocus(action.payload.slug);
            },
            restoreApp(App, action) {
                // get our app
                const app = App.requireId(action.payload.slug);
                // restore it
                app.set('minimized', false);
                // focus it
                app.desktop.focusApp(action.payload.slug);
            },
            destroyApp(App, action) {
                // get our app
                const app = App.requireId(action.payload.slug);
                // deregister app
                app.desktop.deregisterApp(action.payload.slug);
                // destroy app
                app.delete();
            },
        },
    });

    override toString() {
        return `OrcusApp: ${
            (this as unknown as OrcusApp & { name: string }).name
        }`;
    }
}

//export OrcusApp class
export default OrcusApp;
//export actions
export const {
    createApp,
    updateAppProp,
    updateApp,
    openApp,
    closeApp,
    minimizeApp,
    restoreApp,
    destroyApp,
} = OrcusApp.slice.actions;
//export DEFAULT_ID constant for default id functionality in render layer
export { DEFAULT_ID };
