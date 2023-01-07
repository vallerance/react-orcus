/* OrcusUiButton.js
 * Component Description
 * Dependencies: react, prop-types modules, components, services, classes
 * Author: Joshua Carter
 * Created: January 1, 2020
 */
"use strict";
//import modules
import React from 'react';
import PropTypes from 'prop-types';

//create our OrcusUiButton class
var OrcusUiButton = function (props) {
    var className = "orcus-ui orcus-button " + props.className;
    //render
    return (
        <span {...props} className={className}>
            {props.children}
        </span>
    );
};
//define default props
OrcusUiButton.defaultProps = {
    className: ""
};
//define props
OrcusUiButton.propTypes = {
    className: PropTypes.string
};

//export OrcusUiButton class
export { OrcusUiButton };
