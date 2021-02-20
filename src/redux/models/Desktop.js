/* Desktop.js
 * redux-orm model for a Desktop instance (top-level)
 * Dependencies: redux-orm, @reduxjs/toolkit, uuid modules, EnhancedModel class
 * Author: Joshua Carter
 * Created: April 19, 2020
 */
"use strict";
//import dependencies
import { fk, many, oneToOne, attr, createSelector } from 'redux-orm';
import { createSlice } from '@reduxjs/toolkit';
import {v4 as uuidv4 } from 'uuid';
//import classes
import { EnhancedModel } from './EnhancedModel.js';
import OrcusApp from './OrcusApp.js';
//create our Desktop model
var Desktop = class extends EnhancedModel {
    
    static modelName = 'Desktop';

    static fields = {
        // relational accessors
        // - apps: OrcusApp.desktop.apps
        // non-relational fields
        // component props
        id: attr(),       //number, required
        // model props
        // a list of app slugs that is the focus queue
        // an app may be closed by still listed in the focus queue
        _focusedApps: attr() //array
    };
    
    static options = {
        idAttribute: "id"
    };
    
    static defaultProps = {
        id: "0",
        _focusedApps: null
    };
    
    //return an initial state object that is derived from some component props
    static getInitialStateFromProps (props) {
        return Object.fromEntries(
            Object.entries(
                Object.assign({}, Desktop.defaultProps, props, {
                    id: uuidv4(),
                    _focusedApps: []
                })
            ).filter(
                it => it[0] in Desktop.fields
            )
        );
    }
    
    // SELECTORS
    static select = {};
    
    static createSelectors (orm) {
        Desktop.select.desktop = createSelector(orm.Desktop);
        Desktop.select.singleDesktop = createSelector(
            orm.Desktop,
            function (desktops) {
                if (desktops.length !== 1) {
                    throw new Error(
                        `Expected session to contain exactly one desktop instance, but found ${desktops.length}.`
                    );
                }
                return desktops[0];
            }
        );
        Desktop.select.focusedAppSlug = createSelector(
            orm.Desktop._focusedApps,
            function (slugs) {
                // the first app will be the focused app
                return slugs[0];
            }
        );
        // requires extra third argument: appSlug
        // returns 1-indexed focus index of app
        Desktop.select.focusIndex = createSelector(
            orm.Desktop._focusedApps,
            (state, id, appSlug) => appSlug,
            function (slugs, appSlug) {
                // return index (1 indexed) of slug
                return slugs.indexOf(appSlug) + 1;
            }
        );
    }
    
    // REDUCER
    static slice = createSlice({
        name: 'DesktopSlice',
        initialState: undefined,
        reducers: {
            focusApp (Desktop, action) {
                Desktop
                    .requireId(action.payload.id)
                    .focusApp(action.payload.slug);
            },
            blurApp (Desktop, action) {
                Desktop
                    .requireId(action.payload.id)
                    .blurApp(action.payload.slug);
            },
            createDesktop (Desktop, action) {
                Desktop.create(
                    Object.assign({}, Desktop.defaultProps, action.payload)
                );
            },
            updateDesktopProp (Desktop, action) {
                Desktop
                    .requireId(action.payload.id)
                    .set(action.payload.prop, action.payload.value);
            },
            updateDesktop (Desktop, action) {
                Desktop
                    .requireId(action.payload.id)
                    .update(action.payload.props);
            },
            destroyDesktop (Desktop, action) {
                Desktop.requireId(action.payload.id).delete();
            }
        }
    });
    
    // track when the focus of our apps is changed from the initial setting
    #focusUpdated = false;
    
    toString () {
        return `Desktop: ${this.id}`;
    }
    
    // removes slug from focus queue and re-adds it using the provided method
    #updateFocusQueue (appSlug, method) {
        var queue, index;
        if (typeof method != "function") {
            throw new Error(
                `Desktop.__updateFocusQueue(): invalid array prototype method: ${method}.`
            );
        }
        // first search for this app in the focus queue
        queue = this._focusedApps.slice();
        index = queue.indexOf(appSlug);
        // if our slug is already in the queue
        if (index >= 0) {
            //remove it from it's current place
            queue.splice(index, 1);
        }
        // update the given app's focus by apply method to queue
        method.call(queue, appSlug);
        // update queue
        this.set("_focusedApps", queue);
    }
    
    /**
     * Focus the given app (bluring the existing focused app).
     * @param {string} appSlug - the identifier of the app to focus
     */
    focusApp (appSlug) {
        // track this focus update
        this.#focusUpdated = true;
        this.#updateFocusQueue(appSlug, Array.prototype.unshift);
    }

    /**
     * Blur the given app (leaving the next app focused).
     * @param {string} appSlug - the identifier of the app to blur
     */
    blurApp (appSlug) {
        // track this focus update
        this.#focusUpdated = true;
        // if this app isn't currently focused
        if (this._focusedApps.indexOf(appSlug) !== 0) {
            // then it is already blurred isn't it
            return;
        }
        //else, the app is focused, blur it using custom method
        this.#updateFocusQueue(appSlug, function (slug) {
            return this.splice(1, 0, slug);
        });
    }

    #getIndexedApps () {
        return Object.fromEntries(
            this.apps.toModelArray().map(it => [it.slug, it])
        );
    }

    /**
     * Update extra desktop-level props when an app is created.
     * @param {string} appSlug - the identifier of the app to register
     */
    registerApp (appSlug) {
        // if our focus has been updated
        if (this.#focusUpdated) {
            // then just add our app to the end of the focus queue
            this.#updateFocusQueue(appSlug, Array.prototype.push);
            // there is nothing more to do
            return;
        }   // else, we should pay attention to the initial focused property
        // get indexed apps
        var indexedApps = this.#getIndexedApps(),
            // sort keys into new queue
            newQueue = Object.keys(indexedApps)
                .sort((a, b) => {
                    return indexedApps[a].initialFocused - indexedApps[b].initialFocused;
                });
        // update queue
        this.set("_focusedApps", newQueue);
    }

    /**
     * Remove extra desktop-level info when an app is destroyed.
     * @param {string} appSlug - the identifier of the app to deregister
     */
    deregisterApp (appSlug) {
        // remove this app from our focus queue
        this.#updateFocusQueue(appSlug, function () { });
    }
    
};

//export Desktop class
export default Desktop;
//export actions
export const {
    focusApp, blurApp,
    createDesktop, updateDesktopProp, updateDesktop, destroyDesktop
} = Desktop.slice.actions;
