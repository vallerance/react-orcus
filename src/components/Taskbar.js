/* Taskbar.js
 * Renders the taskbar in the desktop
 * Dependencies:
    - modules: react, prop-types, react-redux, reselect
    - components: Shortcut
    - other: Desktop, OrcusApp classes
 * Author: Joshua Carter
 * Created: April 19, 2020
 */
"use strict";
//import modules
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
//import redux models and actions
import Desktop, { focusApp } from '../redux/models/Desktop.js';
import AppModel, { minimizeApp, restoreApp, DEFAULT_ID } from '../redux/models/OrcusApp.js';
//import components
import { Shortcut } from './Shortcut.js';

//create selectors
const selectOpenAppSlugs = createSelector(
    [
        state => AppModel.select.app(state)
    ],
    function (apps) {
        return apps
            .filter(it => it.opened)
            .map(it => it.slug);
    }
);
const selectAppMinimized = createSelector(
    [
        (state, slug) => AppModel.select.app(state, slug)
    ],
    app => app.minimized
);
  
//single taskbar shortcut
function TaskbarShortcut (props) {
    var className = props.className,
        {active, desktopModelId, ...shortcutProps} = props,
        //get our dispatch
        dispatch = useDispatch(),
        //get our minimized status
        minimized = useSelector(state => selectAppMinimized(state, props.slug));

    if (props.active) {
        className += " active ";
    }
    
    function onClick (e) {
        if (props.active) {
            dispatch(minimizeApp({ slug: props.slug }));
        }
        else if (minimized) {
            dispatch(restoreApp({ slug: props.slug }));
        }
        else {
            dispatch(focusApp({
                id: props.desktopModelId,
                slug: props.slug
            }));
        }
    }
    
    //render
    return (
        <Shortcut
            {...shortcutProps} className={className}
            idPrefix="orcus-taskbar-shortcut"
            onClick={onClick}
        />
    );
}
//define props
TaskbarShortcut.propTypes = {
    //custom html props
    className: PropTypes.string,
    //component props
    active: PropTypes.bool,
    slug: PropTypes.string.isRequired,
    desktopModelId: PropTypes.string.isRequired
};
//define default props
TaskbarShortcut.defaultProps = {
    className: "",
    active: false
};

//create our Taskbar component
function Taskbar (props) {
    //get a list of our open apps
    var openAppSlugs = useSelector(
            selectOpenAppSlugs,
            shallowEqual
        ),
        //get our desktop
        desktop = useSelector(
            state => Desktop.select.singleDesktop(state)
        ),
        //get our focused app
        focusedApp = useSelector(
            state => Desktop.select.focusedApp(state, desktop.id)
        );
    //render
    return (
        <div className="orcus-taskbar">
            <div className="orcus-shortcuts">
                {
                    openAppSlugs.map(it => {
                        return (
                            <TaskbarShortcut
                                key={it} slug={it} desktopModelId={desktop.id}
                                active={focusedApp && it == focusedApp.slug}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};
//define default props
Taskbar.defaultProps = {

};
//define props
Taskbar.propTypes = {

};


//export Taskbar component
export { Taskbar };
