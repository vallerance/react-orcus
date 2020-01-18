/* OrcusApp.js
 * Represents a single application in the react-orcus desktop
 * Dependencies: react, prop-types modules
 * Author: Joshua Carter
 * Created: January 1, 2020
 */
"use strict";
//import modules
import React from 'react';
import PropTypes from 'prop-types';
//create our OrcusApp class
var OrcusApp = class extends React.Component {
    constructor (props, context) {
        super(props, context);
    }
    
    render () {
        return null;
    }
};
//define default props
OrcusApp.defaultProps = {
    icon: "th-large",
    initialOpened: false,
    initialPosition: [0, 0, 100, 100]
};
//define props
OrcusApp.propTypes = {
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string,
    initialOpened: PropTypes.bool,
    initialPosition: PropTypes.arrayOf(PropTypes.number),
};
//define context
OrcusApp.contextTypes = {
    
};
//export OrcusApp class
export { OrcusApp };
