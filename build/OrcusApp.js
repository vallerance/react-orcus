/* OrcusApp.js
 * Represents a single application in the react-orcus desktop
 * Dependencies: react, prop-types modules, OrcusUiButton components
 * Author: Joshua Carter
 * Created: January 18, 2020
 */
"use strict"; //import modules

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrcusApp = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _OrcusUiButton = require("./OrcusUiButton.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

//define constants
var DEFAULT_ID = "ORCUS_APP_DEFAULT_ID_VALUE_68142"; //create our OrcusApp class

var OrcusApp =
/*#__PURE__*/
function (_React$Component) {
  _inherits(OrcusApp, _React$Component);

  function OrcusApp(props, context) {
    var _this;

    _classCallCheck(this, OrcusApp);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(OrcusApp).call(this, props, context)); //bind event handlers

    _this.handleMaximizeClick = _this.handleMaximizeClick.bind(_assertThisInitialized(_this));
    _this.handleRestoreClick = _this.handleRestoreClick.bind(_assertThisInitialized(_this)); //init state

    _this.state = {
      opened: _this.props.initialOpened,
      maximized: false
    }; //create default id

    _this.defaultId = "orcus-app-" + Math.floor(Math.random() * 10000);
    return _this;
  }

  _createClass(OrcusApp, [{
    key: "render",
    value: function render() {
      var className = "orcus-app orcus-window " + this.props.className,
          id = this.props.id == DEFAULT_ID ? this.defaultId : this.props.id,
          _this$props = this.props,
          slug = _this$props.slug,
          name = _this$props.name,
          icon = _this$props.icon,
          initialOpened = _this$props.initialOpened,
          initialPosition = _this$props.initialPosition,
          props = _objectWithoutProperties(_this$props, ["slug", "name", "icon", "initialOpened", "initialPosition"]),
          restoreMaximizeContent = ""; //if we are closed


      if (!this.state.opened) {
        //render nothing
        return null;
      } //if we are maximized


      if (this.state.maximized) {
        //show restore button
        restoreMaximizeContent = _react["default"].createElement(_OrcusUiButton.OrcusUiButton, {
          className: "orcus-restore",
          onClick: this.handleRestoreClick
        }, _react["default"].createElement("span", {
          className: "glyphicon glyphicon-resize-small"
        }));
      } else {
        //show maximize button
        restoreMaximizeContent = _react["default"].createElement(_OrcusUiButton.OrcusUiButton, {
          className: "orcus-maximize",
          onClick: this.handleMaximizeClick
        }, _react["default"].createElement("span", {
          className: "glyphicon glyphicon-resize-full"
        }));
      } //render


      return _react["default"].createElement("div", _extends({}, props, {
        className: className,
        id: id
      }), _react["default"].createElement("header", {
        className: "orcus-title-bar"
      }, _react["default"].createElement("h2", {
        className: "orcus-title"
      }, this.props.name), _react["default"].createElement("p", {
        className: "orcus-controls"
      }, _react["default"].createElement(_OrcusUiButton.OrcusUiButton, {
        className: "orcus-minimize"
      }, _react["default"].createElement("span", {
        className: "glyphicon glyphicon-minus"
      })), restoreMaximizeContent, _react["default"].createElement(_OrcusUiButton.OrcusUiButton, {
        className: "orcus-close"
      }, _react["default"].createElement("span", {
        className: "glyphicon glyphicon-remove"
      })))), _react["default"].createElement("section", {
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
  }]);

  return OrcusApp;
}(_react["default"].Component); //define default props


exports.OrcusApp = OrcusApp;
OrcusApp.defaultProps = {
  icon: "th-large",
  initialOpened: false,
  initialPosition: [0, 0, 100, 100],
  className: "",
  id: DEFAULT_ID
}; //define props

OrcusApp.propTypes = {
  slug: _propTypes["default"].string.isRequired,
  name: _propTypes["default"].string.isRequired,
  icon: _propTypes["default"].string,
  initialOpened: _propTypes["default"].bool,
  initialPosition: _propTypes["default"].arrayOf(_propTypes["default"].number),
  className: _propTypes["default"].string,
  id: _propTypes["default"].string
}; //define context

OrcusApp.contextTypes = {}; //export OrcusApp class