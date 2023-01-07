/* reduxConventionalConnect.js
 * Redux connect function that looks for static redux properties/methods on
 * component
 * Dependencies: react-redux module
 * Author: Joshua Carter
 * Created: February 1, 2020
 */
"use strict";
//import dependencies
import { connect } from 'react-redux';

//create our reduxConventionalConnect function
function reduxConventionalConnect (Component) {
    var mapStateToProps = undefined,
        mapDispatchToProps = undefined,
        hasMapProps = typeof Component.mapStateToProps == "function",
        hasMapDispatch = typeof Component.mapDispatchToProps == "function" || 
            typeof Component.mapDispatchToProps == "object" && 
            Component.mapDispatchToProps !== null;
    
    //set mapStateToProps
    if (hasMapProps) {
        mapStateToProps = Component.mapStateToProps;
    }
    if (hasMapDispatch) {
        mapDispatchToProps = Component.mapDispatchToProps;
    }
    
    //return connected component using map functions
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(Component);
}

//export reduxConventionalConnect function
export { reduxConventionalConnect };
