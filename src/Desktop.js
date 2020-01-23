/* Desktop.js
 * The top-level component for react-orcus. Renders the entire desktop.
 * Dependencies: react, prop-types modules
 * Author: Joshua Carter
 * Created: January 18, 2020
 */
"use strict";
//import modules
import React from 'react';
import PropTypes from 'prop-types';
//define constants
const DEFAULT_ID = "ORCUS_DESKTOP_DEFAULT_ID_VALUE_392183";
//create our Desktop class
var Desktop = class extends React.Component {
    constructor (props, context) {
        super(props, context);
        
        //create default id
        this.defaultId = "orcus-desktop-" + Math.floor(Math.random() * 100);
    }
    
    render () {
        var className = "orcus-desktop " + this.props.className,
            //get id, either property or default
            id = (this.props.id == DEFAULT_ID) ? this.defaultId : this.props.id,
            {shortcuts, taskbar, programMenu, ...props} = this.props,
            shortcutsContent = "",
            taskbarContent = "",
            programMenuContent = "";
        if (shortcuts) {
            shortcutsContent = (
                <div className="orcus-shortcuts">
                
                </div>
            );
        }
        if (taskbar) {
            taskbarContent = (
                <div className="orcus-taskbar">
                
                </div>
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
            <div {...props} className={className} id={id}>
                <div className="orcus-desktop-content">
                    {shortcutsContent}
            
                    {this.props.children}
                </div>
            
                {taskbarContent}
            
                {programMenuContent}
            </div>
        );
    }
};
//define default props
Desktop.defaultProps = {
    shortcuts: true,
    taskbar: true,
    programMenu: true,
    
    className: "",
    id: DEFAULT_ID
};
//define props
Desktop.propTypes = {
    shortcuts: PropTypes.bool,
    taskbar:  PropTypes.bool,
    programMenu:  PropTypes.bool,
    
    className: PropTypes.string,
    id: PropTypes.string
};
//define context
Desktop.contextTypes = {
    
};
//export Desktop class
export { Desktop };
