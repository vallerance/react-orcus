/* Taskbar.js
 * Renders the taskbar in the desktop
 * Dependencies:
    - modules: react, prop-types, react-redux, reselect
    - components: Shortcut
    - other: Desktop, OrcusApp classes
 * Author: Joshua Carter
 * Created: April 19, 2020
 */
"use strict"; //import modules

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Taskbar = Taskbar;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reselect = require("reselect");

var _Desktop = _interopRequireWildcard(require("../redux/models/Desktop.js"));

var _OrcusApp = _interopRequireWildcard(require("../redux/models/OrcusApp.js"));

var _Shortcut = require("./Shortcut.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

//create selectors
var selectOpenAppSlugs = (0, _reselect.createSelector)([function (state) {
  return _OrcusApp["default"].select.app(state);
}], function (apps) {
  return apps.filter(function (it) {
    return it.opened;
  }).map(function (it) {
    return it.slug;
  });
});
var selectAppMinimized = (0, _reselect.createSelector)([function (state, slug) {
  return _OrcusApp["default"].select.app(state, slug);
}], function (app) {
  return app.minimized;
}); //single taskbar shortcut

function TaskbarShortcut(props) {
  var className = props.className,
      active = props.active,
      desktopModelId = props.desktopModelId,
      shortcutProps = _objectWithoutProperties(props, ["active", "desktopModelId"]),
      dispatch = (0, _reactRedux.useDispatch)(),
      minimized = (0, _reactRedux.useSelector)(function (state) {
    return selectAppMinimized(state, props.slug);
  });

  if (props.active) {
    className += " active ";
  }

  function onClick(e) {
    if (props.active) {
      dispatch((0, _OrcusApp.minimizeApp)({
        slug: props.slug
      }));
    } else if (minimized) {
      dispatch((0, _OrcusApp.restoreApp)({
        slug: props.slug
      }));
    } else {
      dispatch((0, _Desktop.focusApp)({
        id: props.desktopModelId,
        slug: props.slug
      }));
    }
  } //render


  return /*#__PURE__*/_react["default"].createElement(_Shortcut.Shortcut, _extends({}, shortcutProps, {
    className: className,
    idPrefix: "orcus-taskbar-shortcut",
    onClick: onClick
  }));
} //define props


TaskbarShortcut.propTypes = {
  //custom html props
  className: _propTypes["default"].string,
  //component props
  active: _propTypes["default"].bool,
  slug: _propTypes["default"].string.isRequired,
  desktopModelId: _propTypes["default"].string.isRequired
}; //define default props

TaskbarShortcut.defaultProps = {
  className: "",
  active: false
}; //create our Taskbar component

function Taskbar(props) {
  //get a list of our open apps
  var openAppSlugs = (0, _reactRedux.useSelector)(selectOpenAppSlugs, _reactRedux.shallowEqual),
      //get our desktop
  desktop = (0, _reactRedux.useSelector)(function (state) {
    return _Desktop["default"].select.singleDesktop(state);
  }),
      //get our focused app
  focusedApp = (0, _reactRedux.useSelector)(function (state) {
    return _Desktop["default"].select.focusedApp(state, desktop.id);
  }); //render

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "orcus-taskbar"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "orcus-shortcuts"
  }, openAppSlugs.map(function (it) {
    return /*#__PURE__*/_react["default"].createElement(TaskbarShortcut, {
      key: it,
      slug: it,
      desktopModelId: desktop.id,
      active: focusedApp && it == focusedApp.slug
    });
  })));
}

; //define default props

Taskbar.defaultProps = {}; //define props

Taskbar.propTypes = {}; //export Taskbar component