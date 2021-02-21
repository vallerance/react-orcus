/* OrcusApp.js
 * redux-orm model for an App instance
 * Dependencies: redux-orm, @reduxjs/toolkit modules, EnhancedModel class
 * Author: Joshua Carter
 * Created: February 2, 2020
 */
"use strict";
//import dependencies
import { fk, many, attr, createSelector } from 'redux-orm';
import { createSlice } from '@reduxjs/toolkit';
//import classes
import { EnhancedModel } from './EnhancedModel.js';
//define constants
const DEFAULT_ID = "ORCUS_APP_DEFAULT_ID_VALUE_68142";
//create our OrcusApp model
var OrcusApp = class extends EnhancedModel {
    
    static modelName = 'OrcusApp';

    static fields = {
        // non-relational fields
        // component props
        slug: attr(),       //string, required
        id: attr(),
        icon: attr(),
        initialFocused: attr(),
        name: attr(),
        opened: attr(),     //bool
        minimized: attr(),  //bool
        desktop: fk("Desktop", "apps")
    };
    
    static options = {
        idAttribute: "slug"
    };
    
    static defaultProps = {
        id: DEFAULT_ID,
        icon: "fa:home",
        initialFocused: Infinity,
        name: "",
        opened: false,
        minimized: false
    };
    
    //return an initial state object that is derived from some component props
    static getInitialStateFromProps (props) {
        // transform initialFocused
        var initialFocused = Number(props.initialFocused);
        if (initialFocused <= 0) {
            initialFocused = Infinity;
        }
        return Object.fromEntries(
            Object.entries(
                Object.assign({}, OrcusApp.defaultProps, props, {
                    initialFocused,
                    opened: props.initialOpened
                })
            ).filter(
                it => it[0] in OrcusApp.fields
            )
        );
    }
    
    // SELECTORS
    static select = {};
    
    static createSelectors (orm) {
        OrcusApp.select.app = createSelector(orm.OrcusApp);
        OrcusApp.select.appSlug = createSelector(orm.OrcusApp.slug);
    }
    
    // REDUCER
    static slice = createSlice({
        name: 'OrcusAppSlice',
        initialState: undefined,
        reducers: {
            createApp (App, action) {
                // get desktop
                var session = App.session,
                    desktop = session.Desktop.select.singleDesktop(session),
                    // create app
                    app = App.create(
                        Object.assign({
                            desktop: desktop.id
                        }, OrcusApp.defaultProps, action.payload)
                    );
                // register app
                app.desktop.registerApp(action.payload.slug);
            },
            updateAppProp (App, action) {
                App
                    .requireId(action.payload.slug)
                    .set(action.payload.prop, action.payload.value);
            },
            updateApp (App, action) {
                App
                    .requireId(action.payload.slug)
                    .update(action.payload.props);
            },
            openApp (App, action) {
                // get our app
                var app = App.requireId(action.payload.slug);
                // open it
                app.set("opened", true);
                // focus it
                app.desktop.focusApp(action.payload.slug);
            },
            closeApp (App, action) {
                // get our app
                var app = App.requireId(action.payload.slug);
                // close it
                app.set("opened", false);
                // blur it
                app.desktop.removeAppFocus(action.payload.slug);
            },
            minimizeApp (App, action) {
                // get our app
                var app = App.requireId(action.payload.slug);
                // minimize it it
                app.set("minimized", true);
                // blur it
                app.desktop.removeAppFocus(action.payload.slug);
            },
            restoreApp (App, action) {
                // get our app
                var app = App.requireId(action.payload.slug);
                // restore it
                app.set("minimized", false);
                // focus it
                app.desktop.focusApp(action.payload.slug);
            },
            destroyApp (App, action) {
                // get our app
                var app = App.requireId(action.payload.slug);
                // deregister app
                app.desktop.deregisterApp(action.payload.slug);
                // destroy app
                app.delete();
            }
        }
    });
    
    toString () {
        return `OrcusApp: ${this.name}`;
    }
    
};

//export OrcusApp class
export default OrcusApp;
//export actions
export const {
    createApp, updateAppProp, updateApp,
    openApp, closeApp, minimizeApp, restoreApp,
    destroyApp
} = OrcusApp.slice.actions;
//export DEFAULT_ID constant for default id functionality in render layer
export { DEFAULT_ID };
