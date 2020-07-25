/* Shortcut.js
 * A single orcus shortcut in the desktop
 * Dependencies: react, prop-types, react-redux, iconify modules, OrcusApp class
 * Author: Joshua Carter
 * Created: April 18, 2020
 * Previously: Shortcuts.js
    - Author: Joshua Carter
    - Created: Februrary 23, 2020
 */
"use strict"; //import modules

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shortcut = Shortcut;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _iconify = _interopRequireDefault(require("@iconify/iconify"));

var _OrcusApp = _interopRequireWildcard(require("../redux/models/OrcusApp.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

//individual shortcut
function Shortcut(props) {
  //create defaultId for this component
  var defaultId = (0, _react.useRef)(props.idPrefix + "-" + Math.floor(Math.random() * 10000)),
      className = "orcus-shortcut " + props.className,
      idPrefix = props.idPrefix,
      slug = props.slug,
      htmlProps = _objectWithoutProperties(props, ["idPrefix", "slug"]),
      app = (0, _reactRedux.useSelector)(function (state) {
    return _OrcusApp["default"].select.app(state, props.slug);
  }, _reactRedux.shallowEqual),
      id; //if we couldn't find our app


  if (!app) {
    console.warn("Shortcut: Unable to find app with slug: ".concat(props.slug, " in state"));
    return;
  } //get id, either property or default


  id = app.id == _OrcusApp.DEFAULT_ID ? defaultId.current : idPrefix + "-" + app.id; //render

  return /*#__PURE__*/_react["default"].createElement("div", _extends({}, htmlProps, {
    id: id,
    className: className,
    tabIndex: "0"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "orcus-ui orcus-icon"
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: "iconify",
    "data-icon": app.icon
  })), /*#__PURE__*/_react["default"].createElement("p", {
    className: "orcus-title"
  }, app.name));
}

Shortcut.propTypes = {
  //custom html props
  className: _propTypes["default"].string,
  //component props
  idPrefix: _propTypes["default"].string.isRequired,
  slug: _propTypes["default"].string.isRequired
};
Shortcut.defaultProps = {
  className: ""
}; //export Shortcut component