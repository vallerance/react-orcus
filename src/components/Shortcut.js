/* Shortcut.js
 * A single orcus shortcut in the desktop
 * Dependencies: react, prop-types, react-redux, iconify modules, OrcusApp class
 * Author: Joshua Carter
 * Created: April 18, 2020
 * Previously: Shortcuts.js
    - Author: Joshua Carter
    - Created: Februrary 23, 2020
 */
"use strict";
//import modules
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';
import Iconify from '@iconify/iconify';
//import redux models and actions
import AppModel, { DEFAULT_ID } from '../redux/models/OrcusApp.js';

//individual shortcut
function Shortcut (props) {
    //create defaultId for this component
    var defaultId = useRef(
            props.idPrefix + "-" + Math.floor(Math.random() * 10000)
        ),
        className = "orcus-shortcut " + props.className,
        {idPrefix, slug, ...htmlProps} = props,
        //get the app for this slug
        //use shallow equals to re-render when ANY app props change
        app = useSelector(
            state => AppModel.select.app(state, props.slug),
            shallowEqual
        ),
        id;

    //if we couldn't find our app
    if (!app) {
        console.warn(
            `Shortcut: Unable to find app with slug: ${props.slug} in state`
        );
        return;
    }
    
    //get id, either property or default
    id = (app.id == DEFAULT_ID) ? defaultId.current : idPrefix + "-" + app.id;
    
    //render
    return (
        <div
            {...htmlProps} id={id} className={className} tabIndex="0"
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
    idPrefix: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired
};
Shortcut.defaultProps = {
    className: ""
};

//export Shortcut component
export { Shortcut };
