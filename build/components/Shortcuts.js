/* Shortcuts.js
 * Components to render the shortcuts area of the desktop
 * Dependencies: react, prop-types, react-redux, iconify modules, OrcusApp class
 * Author: Joshua Carter
 * Created: Februrary 23, 2020
 */
"use strict"; //import modules

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shortcuts = DesktopShortcuts;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _iconify = _interopRequireDefault(require("@iconify/iconify"));

var _OrcusApp = _interopRequireWildcard(require("../redux/models/OrcusApp.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

//individual shortcut
function Shortcut(props) {
  //create defaultId for this component
  var defaultId = (0, _react.useRef)("orcus-desktop-shortcut-" + Math.floor(Math.random() * 10000)),
      className = "orcus-desktop-shortcut " + props.className,
      slug = props.slug,
      htmlProps = _objectWithoutProperties(props, ["slug"]),
      app = (0, _reactRedux.useSelector)(function (state) {
    return _OrcusApp["default"].select.app(state, props.slug);
  }, _reactRedux.shallowEqual),
      dispatch = (0, _reactRedux.useDispatch)(),
      _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      selected = _useState2[0],
      setSelected = _useState2[1],
      id; //if we couldn't find our app


  if (!app) {
    console.warn("Shortcut: Unable to find app with slug: ".concat(props.slug, " in state"));
    return;
  } //get id, either property or default


  id = app.id == _OrcusApp.DEFAULT_ID ? defaultId.current : "orcus-desktop-shortcut-".concat(app.id);

  if (selected) {
    className += " selected ";
  }

  function onClick(e) {
    setSelected(!selected);
  }

  function onDoubleClick(e) {
    dispatch((0, _OrcusApp.openApp)({
      slug: slug
    }));
  } //render


  return _react["default"].createElement("div", _extends({}, htmlProps, {
    id: id,
    className: className,
    onClick: onClick,
    onDoubleClick: onDoubleClick
  }), _react["default"].createElement("div", {
    className: "orcus-ui orcus-icon"
  }, _react["default"].createElement("i", {
    className: "iconify",
    "data-icon": app.icon
  })), _react["default"].createElement("p", {
    className: "orcus-title"
  }, app.name));
}

Shortcut.propTypes = {
  //custom html props
  className: _propTypes["default"].string,
  //component props
  slug: _propTypes["default"].string.isRequired
};
Shortcut.defaultProps = {
  className: ""
}; //create our main Shortcuts component

function DesktopShortcuts(props) {
  //get a list of our apps
  var appSlugs = (0, _reactRedux.useSelector)(function (state) {
    return _OrcusApp["default"].select.appSlug(state);
  }, _reactRedux.shallowEqual); //render

  return _react["default"].createElement("div", {
    className: "orcus-shortcuts"
  }, appSlugs.map(function (it) {
    return _react["default"].createElement(Shortcut, {
      key: it,
      slug: it
    });
  }));
}

; //define default props

DesktopShortcuts.defaultProps = {}; //define props

DesktopShortcuts.propTypes = {}; //export Shortcuts component