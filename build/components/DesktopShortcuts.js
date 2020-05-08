/* DesktopShortcuts.js
 * Components to render the shortcuts area of the desktop
 * Dependencies:
    - modules: react, prop-types, react-redux, iconify
    - components: Shortcut
    - other: OrcusApp class
 * Author: Joshua Carter
 * Created: April 18, 2020
 * Previously: Shortcuts.js:
    - Author: Joshua Carter
    - Created: Februrary 23, 2020
 */
"use strict"; //import modules

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DesktopShortcuts = DesktopShortcuts;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _iconify = _interopRequireDefault(require("@iconify/iconify"));

var _OrcusApp = _interopRequireWildcard(require("../redux/models/OrcusApp.js"));

var _Shortcut = require("./Shortcut.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//individual shortcut
function DesktopShortcut(props) {
  var className = props.className,
      dispatch = (0, _reactRedux.useDispatch)(),
      _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      selected = _useState2[0],
      setSelected = _useState2[1];

  if (selected) {
    className += " selected ";
  }

  function onClick(e) {
    setSelected(!selected);
  }

  function onDoubleClick(e) {
    dispatch((0, _OrcusApp.openApp)({
      slug: props.slug
    }));
  } //render


  return /*#__PURE__*/_react["default"].createElement(_Shortcut.Shortcut, _extends({}, props, {
    className: className,
    idPrefix: "orcus-desktop-shortcut",
    onClick: onClick,
    onDoubleClick: onDoubleClick
  }));
}

_Shortcut.Shortcut.propTypes = {
  //custom html props
  className: _propTypes["default"].string,
  //component props
  slug: _propTypes["default"].string.isRequired
};
_Shortcut.Shortcut.defaultProps = {
  className: ""
}; //create our main Shortcuts component

function DesktopShortcuts(props) {
  //get a list of our apps
  var appSlugs = (0, _reactRedux.useSelector)(function (state) {
    return _OrcusApp["default"].select.appSlug(state);
  }, _reactRedux.shallowEqual); //render

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "orcus-shortcuts"
  }, appSlugs.map(function (it) {
    return /*#__PURE__*/_react["default"].createElement(DesktopShortcut, {
      key: it,
      slug: it
    });
  }));
}

; //define default props

DesktopShortcuts.defaultProps = {}; //define props

DesktopShortcuts.propTypes = {}; //export Shortcuts component