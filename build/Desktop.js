/* Desktop.js
 * The top-level component for react-orcus. Renders the entire desktop.
 * Dependencies:
    - modules: react, prop-types, @reduxjs/toolkit, react-redux, reselect
    - components: OrcusApp, Shortcuts
    - other: orm reducer, OrcusApp class
 * Author: Joshua Carter
 * Created: January 18, 2020
 */
"use strict"; //import modules

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Desktop = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _toolkit = require("@reduxjs/toolkit");

var _reactRedux = require("react-redux");

var _reselect = require("reselect");

var _ormReducer = _interopRequireDefault(require("./redux/ormReducer.js"));

var _OrcusApp = _interopRequireWildcard(require("./redux/models/OrcusApp.js"));

var _OrcusApp2 = require("./OrcusApp.js");

var _Shortcuts = require("./components/Shortcuts.js");

var _class, _temp, _defaultId;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

//define constants
var DEFAULT_ID = "ORCUS_DESKTOP_DEFAULT_ID_VALUE_392183"; //create our Desktop class

var Desktop = (_temp = _class = /*#__PURE__*/function (_React$Component) {
  _inherits(Desktop, _React$Component);

  var _super = _createSuper(Desktop);

  function Desktop() {
    var _this;

    _classCallCheck(this, Desktop);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.reduxStore = (0, _toolkit.configureStore)({
      reducer: _ormReducer["default"]
    });
    Object.defineProperty(_assertThisInitialized(_this), _defaultId, {
      writable: true,
      value: "orcus-desktop-" + Math.floor(Math.random() * 10000000)
    });
    return _this;
  }

  _createClass(Desktop, [{
    key: "updateAppList",
    value: function updateAppList(children) {
      var _this2 = this;

      // get app children
      var childApps = Object.fromEntries(_react["default"].Children.toArray(children).filter(function (it) {
        return it.type == _OrcusApp2.OrcusApp;
      }).map(function (it) {
        return [it.props.slug, it.props];
      })),
          childAppSlugs = Object.keys(childApps),
          //get apps from store
      existingAppSlugs = Desktop.selectAppSlugs(this.reduxStore.getState()); //find and remove old apps

      existingAppSlugs //find old apps that have been removed
      .filter(function (it) {
        return !childAppSlugs.includes(it);
      }) //remove them
      .forEach(function (slug) {
        return _this2.reduxStore.dispatch((0, _OrcusApp.destroyApp)({
          slug: slug
        }));
      }); //find and create new apps

      childAppSlugs //find new apps that have just been added
      .filter(function (it) {
        return !existingAppSlugs.includes(it);
      }) //create them
      .forEach(function (slug) {
        return _this2.reduxStore.dispatch((0, _OrcusApp.createApp)(_OrcusApp["default"].getInitialStateFromProps(childApps[slug])));
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // update apps
      this.updateAppList(this.props.children);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      // update apps
      this.updateAppList(this.props.children);
    }
  }, {
    key: "render",
    value: function render() {
      var className = "orcus-desktop " + this.props.className,
          id = this.props.id == DEFAULT_ID ? _classPrivateFieldLooseBase(this, _defaultId)[_defaultId] : this.props.id,
          _this$props = this.props,
          shortcuts = _this$props.shortcuts,
          taskbar = _this$props.taskbar,
          programMenu = _this$props.programMenu,
          props = _objectWithoutProperties(_this$props, ["shortcuts", "taskbar", "programMenu"]),
          shortcutsContent = "",
          taskbarContent = "",
          programMenuContent = "";

      if (shortcuts) {
        shortcutsContent = /*#__PURE__*/_react["default"].createElement(_Shortcuts.Shortcuts, null);
      }

      if (taskbar) {
        taskbarContent = /*#__PURE__*/_react["default"].createElement("div", {
          className: "orcus-taskbar"
        });
      }

      if (programMenu) {
        programMenuContent = /*#__PURE__*/_react["default"].createElement("div", {
          className: "orcus-program-menu"
        });
      } //render


      return /*#__PURE__*/_react["default"].createElement(_reactRedux.Provider, {
        store: this.reduxStore
      }, /*#__PURE__*/_react["default"].createElement("div", _extends({}, props, {
        className: className,
        id: id
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "orcus-desktop-content"
      }, shortcutsContent, this.props.children), taskbarContent, programMenuContent));
    }
  }]);

  return Desktop;
}(_react["default"].Component), _defaultId = _classPrivateFieldLooseKey("defaultId"), _class.defaultProps = {
  shortcuts: true,
  taskbar: true,
  programMenu: true,
  className: "",
  id: DEFAULT_ID
}, _class.propTypes = {
  //custom html props
  className: _propTypes["default"].string,
  id: _propTypes["default"].string,
  //component props
  shortcuts: _propTypes["default"].bool,
  taskbar: _propTypes["default"].bool,
  programMenu: _propTypes["default"].bool
}, _class.selectAppSlugs = function (state) {
  return _OrcusApp["default"].select.appSlug(state);
}, _temp); //export Desktop class

exports.Desktop = Desktop;