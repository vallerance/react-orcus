/* reduxConventionalConnect.js
 * Redux connect function that looks for static redux properties/methods on
 * component
 * Dependencies: react-redux module
 * Author: Joshua Carter
 * Created: February 1, 2020
 */
"use strict"; //import dependencies

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduxConventionalConnect = reduxConventionalConnect;

var _reactRedux = require("react-redux");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

//create our reduxConventionalConnect function
function reduxConventionalConnect(Component) {
  var mapStateToProps = undefined,
      mapDispatchToProps = undefined,
      hasMapProps = typeof Component.mapStateToProps == "function",
      hasMapDispatch = typeof Component.mapDispatchToProps == "function" || _typeof(Component.mapDispatchToProps) == "object" && Component.mapDispatchToProps !== null; //set mapStateToProps

  if (hasMapProps) {
    mapStateToProps = Component.mapStateToProps;
  }

  if (hasMapDispatch) {
    mapDispatchToProps = Component.mapDispatchToProps;
  } //return connected component using map functions


  return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Component);
} //export reduxConventionalConnect function