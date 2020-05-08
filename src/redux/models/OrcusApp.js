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
        name: "",
        opened: false,
        minimized: false
    };
    
    //return an initial state object that is derived from some component props
    static getInitialStateFromProps (props) {
        return Object.fromEntries(
            Object.entries(
                Object.assign({}, OrcusApp.defaultProps, props, {
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
                // get desktop id
                var session = App.session,
                    desktopId = session.Desktop.select.singleDesktop(session).id;
                App.create(
                    Object.assign({
                        desktop: desktopId
                    }, OrcusApp.defaultProps, action.payload)
                );
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
                App.requireId(action.payload.slug).set("opened", true);
            },
            closeApp (App, action) {
                App.requireId(action.payload.slug).set("opened", false);
            },
            minimizeApp (App, action) {
                App.requireId(action.payload.slug).set("minimized", true);
            },
            destroyApp (App, action) {
                App.requireId(action.payload.slug).delete();
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
    openApp, closeApp, minimizeApp,
    destroyApp
} = OrcusApp.slice.actions;
//export DEFAULT_ID constant for default id functionality in render layer
export { DEFAULT_ID };
