/* DesktopShortcuts.js
 * Components to render the shortcuts area of the desktop
 * Dependencies:
    - modules: react, prop-types, react-redux, iconify
    - components: Shortcut
    - other: OrcusApp class
 * Author: Joshua Carter
 * Created: April 18, 2020
 * Previously: Shortcuts.js:
    - Author: Joshua Carter
    - Created: Februrary 23, 2020
 */
"use strict";
//import modules
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import Iconify from '@iconify/iconify';
//import redux models and actions
import AppModel, { openApp, DEFAULT_ID } from '../redux/models/OrcusApp.js';
//import components
import { Shortcut } from './Shortcut.js';

//individual shortcut
function DesktopShortcut (props) {
    var className = props.className,
        //get our dispatch
        dispatch = useDispatch(),
        //track selected state
        [selected, setSelected] = useState(false);

    if (selected) {
        className += " selected ";
    }
    
    function onClick (e) {
        setSelected(!selected);
    }
    
    function onDoubleClick (e) {
        dispatch(openApp({ slug: props.slug }));
    }
    
    //render
    return (
        <Shortcut
            {...props} className={className} idPrefix="orcus-desktop-shortcut"
            onClick={onClick} onDoubleClick={onDoubleClick}
        />
    );
}
DesktopShortcut.propTypes = {
    //custom html props
    className: PropTypes.string,
    //component props
    slug: PropTypes.string.isRequired
};
DesktopShortcut.defaultProps = {
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
                appSlugs.map(it => <DesktopShortcut key={it} slug={it} />)
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
export { DesktopShortcuts };
