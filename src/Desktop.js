/* Desktop.js
 * The top-level component for react-orcus. Renders the entire desktop.
 * Dependencies: react, prop-types modules
 * Author: Joshua Carter
 * Created: January 1, 2020
 */
"use strict";
//import modules
import React from 'react';
import PropTypes from 'prop-types';
//create our Desktop class
var Desktop = class extends React.Component {
    constructor (props, context) {
        super(props, context);
    }
    
    render () {
        return null;
    }
};
//define default props
Desktop.defaultProps = {
    shortcuts: true,
    taskbar: true,
    programMenu: true
};
//define props
Desktop.propTypes = {
    shortcuts: PropTypes.bool,
    taskbar:  PropTypes.bool,
    programMenu:  PropTypes.bool
};
//define context
Desktop.contextTypes = {
    
};
//export Desktop class
export { Desktop };
