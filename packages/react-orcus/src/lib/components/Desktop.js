/* Desktop.js
 * The top-level component for react-orcus. Renders the entire desktop.
 * Dependencies:
    - modules: react, prop-types, @reduxjs/toolkit, react-redux, reselect
    - components: OrcusApp, DesktopShortcuts, Taskbar
    - other: orm reducer, OrcusApp class
 * Author: Joshua Carter
 * Created: January 18, 2020
 */
"use strict";
//import modules
import React from 'react';
import PropTypes from 'prop-types';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { createSelector } from 'reselect';
//import reducers
import ormReducer, { orm } from '../redux/ormReducer.js';
//import redux models and actions
import DesktopModel from '../redux/models/Desktop.js';
import AppModel, { createApp, openApp, closeApp, destroyApp } from '../redux/models/OrcusApp.js';
// import components
import { OrcusApp } from './OrcusApp.js';
import { DesktopShortcuts } from './DesktopShortcuts.js';
import { Taskbar } from './Taskbar.js';
// import styles
import Styles from '../styles'
//define constants
const DEFAULT_ID = "ORCUS_DESKTOP_DEFAULT_ID_VALUE_392183";
//create our Desktop class
var Desktop = class extends React.Component {
    
    //define default props
    static defaultProps = {
        shortcuts: true,
        taskbar: "bottom",
        programMenu: true,

        className: "",
        id: DEFAULT_ID
    };
    //define props
    static propTypes = {
        //custom html props
        className: PropTypes.string,
        id: PropTypes.string,
        //component props
        shortcuts: PropTypes.bool,
        taskbar:  PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.oneOf(["top", "right", "bottom", "left"])
        ]),
        programMenu:  PropTypes.bool
    };

    //define selectors
    static selectAppSlugs = state => AppModel.select.appSlug(state);
    
    //INSTANCE PROPS
    
    /*
     * The Redux State Tree
     *
     * Rather than using some sort of singleton pattern for the state tree
     * where all <Desktop /> components in a hypothetical app would share
     * the same tree, I elected to have one separate state tree for each
     * <Desktop /> component. This means that no two <Desktop />
     * components will ever share or communicate state with each other.
     * This will make it easier to allow users of the library to interact
     * with the state tree of a <Desktop /> component down the road.
     *
     * It should be noted that the vast majority of use cases for this
     * library will only include a single <Desktop /> component in the
     * entire app meaning that there would be no functional differences
     * between one shared tree and one tree per <Desktop /> component.
     *
     * Since I am going with having one state tree per <Desktop />
     * component, it makes the most sense to just create the state tree in
     * the constructor of the component itself.
     *
     */
    
    // create a Desktop instance for our state tree
    #initialState = orm.getEmptyState();
    #session = orm.mutableSession(this.#initialState)
    #__create = this.#session.Desktop.create(
        DesktopModel.getInitialStateFromProps({})
    );
    // create redux store
    reduxStore = configureStore({
        reducer: ormReducer,
        preloadedState: this.#initialState
    });

    //create default id
    #defaultId = "orcus-desktop-" + Math.floor(Math.random() * 10000000);
    
    updateAppList (children) {
        // get app children
        var childApps = Object.fromEntries(
                React.Children
                    .toArray(children)
                    .filter(it => it.type == OrcusApp)
                    .map(it => {
                        var props = Object.assign(
                            {},
                            OrcusApp.WrappedComponent.defaultProps,
                            it.props
                        );
                        return [props.slug, props];
                    })
            ),
            childAppSlugs = Object.keys(childApps),
            //get apps from store
            existingAppSlugs = Desktop.selectAppSlugs(
                this.reduxStore.getState()
            );
        //find and remove old apps
        existingAppSlugs
            //find old apps that have been removed
            .filter(it => !childAppSlugs.includes(it))
            //remove them
            .forEach(
                slug => this.reduxStore.dispatch(destroyApp({ slug }))
            );
        //find and create new apps
        childAppSlugs
            //find new apps that have just been added
            .filter(it => !existingAppSlugs.includes(it))
            //create them
            .forEach(
                slug => this.reduxStore.dispatch(createApp(
                    AppModel.getInitialStateFromProps(childApps[slug])
                ))
            );        
    }

    componentDidMount () {
        // update apps
        this.updateAppList(this.props.children);
    }
        
    componentDidUpdate () {
        // update apps
        this.updateAppList(this.props.children);
    }
        
    render () {
        var className = "orcus-desktop " + this.props.className,
            //get id, either property or default
            id = (this.props.id == DEFAULT_ID) ? this.#defaultId : this.props.id,
            {shortcuts, taskbar, programMenu, ...props} = this.props,
            shortcutsContent = "",
            taskbarContent = "",
            programMenuContent = "";
        if (shortcuts) {
            shortcutsContent = (
                <DesktopShortcuts />
            );
        }
        if (taskbar === true) {
            taskbar = Desktop.defaultProps.taskbar;
        }
        if (taskbar) {
            className += " taskbar-"+taskbar;
            taskbarContent = (
                <Taskbar />
            );
        }
        if (programMenu) {
            programMenuContent = (
                <div className="orcus-program-menu">
                
                </div>
            );
        }
        //render
        return (
            <Provider store={this.reduxStore}>
                <Styles />
                
                <div {...props} className={className} id={id}>
                    <div className="orcus-desktop-content">
                        {shortcutsContent}

                        {this.props.children}
                    </div>

                    {taskbarContent}

                    {programMenuContent}
                </div>
            </Provider>
        );
    }
};

//export Desktop class
export { Desktop };
