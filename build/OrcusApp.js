/* OrcusApp.js
 * Represents a single application in the react-orcus desktop
 * Dependencies: 
    - modules: react, prop-types, iconify, reselect, react-rnd
    - components: OrcusUiButton
    - other: OrcusApp class, reduxConventionalConnect function
 * Author: Joshua Carter
 * Created: January 18, 2020
 */
"use strict"; //import modules

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrcusAppUnit = exports.OrcusApp = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _iconify = _interopRequireDefault(require("@iconify/iconify"));

var _reselect = require("reselect");

var _reactRnd = require("react-rnd");

var _OrcusApp = _interopRequireWildcard(require("./redux/models/OrcusApp.js"));

var _OrcusUiButton = require("./OrcusUiButton.js");

var _reduxConventionalConnect = require("./util/reduxConventionalConnect.js");

var _class, _temp, _handleMaximizeClick, _handleRestoreClick, _handleCloseClick, _defaultId;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

//create our OrcusApp class
var OrcusApp = (_temp = _class = /*#__PURE__*/function (_React$Component) {
  _inherits(OrcusApp, _React$Component);

  var _super = _createSuper(OrcusApp);

  function OrcusApp() {
    var _this;

    _classCallCheck(this, OrcusApp);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    Object.defineProperty(_assertThisInitialized(_this), _handleMaximizeClick, {
      writable: true,
      value: _this.handleMaximizeClick.bind(_assertThisInitialized(_this))
    });
    Object.defineProperty(_assertThisInitialized(_this), _handleRestoreClick, {
      writable: true,
      value: _this.handleRestoreClick.bind(_assertThisInitialized(_this))
    });
    Object.defineProperty(_assertThisInitialized(_this), _handleCloseClick, {
      writable: true,
      value: _this.handleCloseClick.bind(_assertThisInitialized(_this))
    });
    _this.state = {
      maximized: false
    };
    Object.defineProperty(_assertThisInitialized(_this), _defaultId, {
      writable: true,
      value: "orcus-app-" + Math.floor(Math.random() * 10000)
    });
    return _this;
  }

  _createClass(OrcusApp, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var update = {},
          props = this.props; // check for prop changes

      ["name", "icon", "id"].forEach(function (prop) {
        if (props[prop] != prevProps[prop]) {
          update[prop] = props[prop];
        }
      }); // if we have updates, update our store

      if (Object.keys(update).length > 0) {
        this.props.updateApp({
          slug: this.props.slug,
          props: update
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var className = "orcus-app orcus-window " + this.props.className,
          id = this.props.id == _OrcusApp.DEFAULT_ID ? _classPrivateFieldLooseBase(this, _defaultId)[_defaultId] : this.props.id,
          _this$props = this.props,
          slug = _this$props.slug,
          name = _this$props.name,
          icon = _this$props.icon,
          initialOpened = _this$props.initialOpened,
          initialPosition = _this$props.initialPosition,
          opened = _this$props.opened,
          updateApp = _this$props.updateApp,
          closeApp = _this$props.closeApp,
          props = _objectWithoutProperties(_this$props, ["slug", "name", "icon", "initialOpened", "initialPosition", "opened", "updateApp", "closeApp"]),
          _initialPosition = _slicedToArray(initialPosition, 4),
          x = _initialPosition[0],
          y = _initialPosition[1],
          width = _initialPosition[2],
          height = _initialPosition[3],
          restoreMaximizeContent = ""; //if we are closed


      if (!this.props.opened) {
        //render nothing
        return null;
      } //if we are maximized


      if (this.state.maximized) {
        //show restore button
        restoreMaximizeContent = /*#__PURE__*/_react["default"].createElement(_OrcusUiButton.OrcusUiButton, {
          className: "orcus-restore",
          key: "restore",
          onClick: _classPrivateFieldLooseBase(this, _handleRestoreClick)[_handleRestoreClick]
        }, /*#__PURE__*/_react["default"].createElement("i", {
          className: "iconify",
          "data-icon": "fa:window-restore"
        }));
      } else {
        //show maximize button
        restoreMaximizeContent = /*#__PURE__*/_react["default"].createElement(_OrcusUiButton.OrcusUiButton, {
          className: "orcus-maximize",
          key: "maximize",
          onClick: _classPrivateFieldLooseBase(this, _handleMaximizeClick)[_handleMaximizeClick]
        }, /*#__PURE__*/_react["default"].createElement("i", {
          className: "iconify",
          "data-icon": "fa:window-maximize"
        }));
      } //render


      return /*#__PURE__*/_react["default"].createElement(_reactRnd.Rnd, _extends({}, props, {
        className: className,
        id: id,
        tabIndex: "0",
        "default": {
          x: x,
          y: y,
          width: width,
          height: height
        },
        dragHandleClassName: "orcus-title-bar",
        resizeHandleClasses: {
          top: "orcus-resize-handle top",
          right: "orcus-resize-handle right",
          bottom: "orcus-resize-handle bottom",
          left: "orcus-resize-handle left",
          topRight: "orcus-resize-handle top right",
          bottomRight: "orcus-resize-handle bottom right",
          bottomLeft: "orcus-resize-handle bottom left",
          topLeft: "orcus-resize-handle top left"
        }
      }), /*#__PURE__*/_react["default"].createElement("header", {
        className: "orcus-title-bar"
      }, /*#__PURE__*/_react["default"].createElement("h2", {
        className: "orcus-title"
      }, this.props.name), /*#__PURE__*/_react["default"].createElement("p", {
        className: "orcus-controls"
      }, /*#__PURE__*/_react["default"].createElement(_OrcusUiButton.OrcusUiButton, {
        className: "orcus-minimize"
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "iconify",
        "data-icon": "fa:window-minimize"
      })), restoreMaximizeContent, /*#__PURE__*/_react["default"].createElement(_OrcusUiButton.OrcusUiButton, {
        className: "orcus-close",
        onClick: _classPrivateFieldLooseBase(this, _handleCloseClick)[_handleCloseClick]
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "iconify",
        "data-icon": "fa:close"
      })))), /*#__PURE__*/_react["default"].createElement("section", {
        className: "orcus-client-area"
      }, this.props.children));
    }
  }, {
    key: "handleMaximizeClick",
    value: function handleMaximizeClick(e) {
      this.setState({
        maximized: true
      });
    }
  }, {
    key: "handleRestoreClick",
    value: function handleRestoreClick(e) {
      this.setState({
        maximized: false
      });
    }
  }, {
    key: "handleCloseClick",
    value: function handleCloseClick(e) {
      //dispatch close action
      this.props.closeApp({
        slug: this.props.slug
      });
    }
  }]);

  return OrcusApp;
}(_react["default"].Component), _handleMaximizeClick = _classPrivateFieldLooseKey("handleMaximizeClick"), _handleRestoreClick = _classPrivateFieldLooseKey("handleRestoreClick"), _handleCloseClick = _classPrivateFieldLooseKey("handleCloseClick"), _defaultId = _classPrivateFieldLooseKey("defaultId"), _class.defaultProps = {
  className: "",
  id: _OrcusApp.DEFAULT_ID,
  icon: "fa:home",
  initialOpened: false,
  initialPosition: [0, 0, 100, 100],
  opened: false
}, _class.propTypes = {
  //custom html props
  className: _propTypes["default"].string,
  id: _propTypes["default"].string,
  //component props
  slug: _propTypes["default"].string.isRequired,
  name: _propTypes["default"].string.isRequired,
  icon: _propTypes["default"].string,
  initialOpened: _propTypes["default"].bool,
  initialPosition: _propTypes["default"].arrayOf(_propTypes["default"].number),
  //state props
  opened: _propTypes["default"].bool,
  //dispatch props
  closeApp: _propTypes["default"].func.isRequired,
  updateApp: _propTypes["default"].func.isRequired
}, _class.selectApp = function (state, ownProps) {
  return _OrcusApp["default"].select.app(state, ownProps.slug);
}, _class.selectAppProps = (0, _reselect.createSelector)([_class.selectApp, function (state, ownProps) {
  return ownProps;
}], function (app, ownProps) {
  var _ref = app || _OrcusApp["default"].getInitialStateFromProps(ownProps),
      opened = _ref.opened;

  return {
    opened: opened
  };
}), _class.mapDispatchToProps = {
  updateApp: _OrcusApp.updateApp,
  closeApp: _OrcusApp.closeApp
}, _class.mapStateToProps = _class.selectAppProps, _temp); //export OrcusApp class

exports.OrcusAppUnit = OrcusApp;
var Connected = (0, _reduxConventionalConnect.reduxConventionalConnect)(OrcusApp);
exports.OrcusApp = Connected;