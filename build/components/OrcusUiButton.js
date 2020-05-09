/* OrcusUiButton.js
 * Component Description
 * Dependencies: react, prop-types modules, components, services, classes
 * Author: Joshua Carter
 * Created: January 1, 2020
 */
"use strict"; //import modules

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrcusUiButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

//create our OrcusUiButton class
var OrcusUiButton = function OrcusUiButton(props) {
  var className = "orcus-ui orcus-button " + props.className; //render

  return /*#__PURE__*/_react["default"].createElement("span", _extends({}, props, {
    className: className
  }), props.children);
}; //define default props


exports.OrcusUiButton = OrcusUiButton;
OrcusUiButton.defaultProps = {
  className: ""
}; //define props

OrcusUiButton.propTypes = {
  className: _propTypes["default"].string
}; //export OrcusUiButton class