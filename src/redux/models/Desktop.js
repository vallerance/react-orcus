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
//create our Desktop model
var Desktop = class extends EnhancedModel {
    
    static modelName = 'Desktop';

    static fields = {
        // non-relational fields
        // component props
        id: attr(),       //number, required
        focusedApp: oneToOne('OrcusApp', 'focused')
    };
    
    static options = {
        idAttribute: "id"
    };
    
    static defaultProps = {
        id: "0"
    };
    
    //return an initial state object that is derived from some component props
    static getInitialStateFromProps (props) {
        return Object.fromEntries(
            Object.entries(
                Object.assign({}, Desktop.defaultProps, props, {
                    id: uuidv4()
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
        Desktop.select.focusedApp = createSelector(orm.Desktop.focusedApp);
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
    
    toString () {
        return `Desktop: ${this.id}`;
    }
    
    /**
     * Focus the given app (bluring the existing focused app).
     * @param {string} appSlug - the identifier of the app to focus
     */
    focusApp (appSlug) {
        // focus the given app
        this.set("focusedApp", appSlug);
    }

    /**
     * Blur the given app (leaving no app focused).
     * @param {string} appSlug - the identifier of the app to blue
     */
    blurApp (appSlug) {
        // if this app is currently focused
        if (this.focusedApp && this.focusedApp.slug == appSlug) {
            // blur it
            this.set("focusedApp", undefined);
        }
    }
    
};

//export Desktop class
export default Desktop;
//export actions
export const {
    focusApp, blurApp,
    createDesktop, updateDesktopProp, updateDesktop, destroyDesktop
} = Desktop.slice.actions;
