/* Shortcuts.js
 * Components to render the shortcuts area of the desktop
 * Dependencies: react, prop-types, react-redux, iconify modules, OrcusApp class
 * Author: Joshua Carter
 * Created: Februrary 23, 2020
 */
"use strict";
//import modules
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import Iconify from '@iconify/iconify';
//import redux models and actions
import AppModel, { openApp, DEFAULT_ID } from '../redux/models/OrcusApp.js';

//individual shortcut
function Shortcut (props) {
    //create defaultId for this component
    var defaultId = useRef(
            "orcus-desktop-shortcut-" + Math.floor(Math.random() * 10000)
        ),
        className = "orcus-desktop-shortcut " + props.className,
        {slug, ...htmlProps} = props,
        //get the app for this slug
        //use shallow equals to re-render when ANY app props change
        app = useSelector(
            state => AppModel.select.app(state, props.slug),
            shallowEqual
        ),
        //get our dispatch
        dispatch = useDispatch(),
        //track selected state
        [selected, setSelected] = useState(false),
        id;

    //if we couldn't find our app
    if (!app) {
        console.warn(
            `Shortcut: Unable to find app with slug: ${props.slug} in state`
        );
        return;
    }
    
    //get id, either property or default
    id = (app.id == DEFAULT_ID) ?
        defaultId.current :
        `orcus-desktop-shortcut-${app.id}`;
    
    if (selected) {
        className += " selected ";
    }
    
    function onClick (e) {
        setSelected(!selected);
    }
    
    function onDoubleClick (e) {
        dispatch(openApp({ slug }));
    }
    
    //render
    return (
        <div
            {...htmlProps} id={id} className={className}
            onClick={onClick} onDoubleClick={onDoubleClick}
        >
            <div className="orcus-ui orcus-icon">
                <i className="iconify" data-icon={app.icon} />
            </div>
        
            <p className="orcus-title">
                {app.name}
            </p>
        </div>
    );                
}
Shortcut.propTypes = {
    //custom html props
    className: PropTypes.string,
    //component props
    slug: PropTypes.string.isRequired
};
Shortcut.defaultProps = {
    className: ""
};

//create our main Shortcuts component
function DesktopShortcuts (props) {
    //get a list of our apps
    var appSlugs = useSelector(
        state => AppModel.select.appSlug(state),
        shallowEqual
    );
    //render
    return (
        <div className="orcus-shortcuts">
            {
                appSlugs.map(it => <Shortcut key={it} slug={it} />)
            }
        </div>
    );
    
};
//define default props
DesktopShortcuts.defaultProps = {
    
};
//define props
DesktopShortcuts.propTypes = {
    
};

//export Shortcuts component
export { DesktopShortcuts as Shortcuts };
