/* OrcusApp.js
 * redux-orm model for an App instance
 * Dependencies: redux-orm, @reduxjs/toolkit modules, EnhancedModel class
 * Author: Joshua Carter
 * Created: February 2, 2020
 */
"use strict"; //import dependencies

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_ID = exports.destroyApp = exports.closeApp = exports.openApp = exports.updateApp = exports.updateAppProp = exports.createApp = exports["default"] = void 0;

var _reduxOrm = require("redux-orm");

var _toolkit = require("@reduxjs/toolkit");

var _EnhancedModel2 = require("./EnhancedModel.js");

var _class, _temp;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

//define constants
var DEFAULT_ID = "ORCUS_APP_DEFAULT_ID_VALUE_68142"; //create our OrcusApp model

exports.DEFAULT_ID = DEFAULT_ID;
var OrcusApp = (_temp = _class = /*#__PURE__*/function (_EnhancedModel) {
  _inherits(OrcusApp, _EnhancedModel);

  function OrcusApp() {
    _classCallCheck(this, OrcusApp);

    return _possibleConstructorReturn(this, _getPrototypeOf(OrcusApp).apply(this, arguments));
  }

  _createClass(OrcusApp, [{
    key: "toString",
    value: function toString() {
      return "OrcusApp: ".concat(this.name);
    }
  }], [{
    key: "getInitialStateFromProps",
    //return an initial state object that is derived from some component props
    value: function getInitialStateFromProps(props) {
      return Object.fromEntries(Object.entries(Object.assign({}, OrcusApp.defaultProps, props, {
        opened: props.initialOpened
      })).filter(function (it) {
        return ['slug', 'id', 'icon', 'name', 'opened'].includes(it[0]);
      }));
    } // SELECTORS

  }, {
    key: "createSelectors",
    value: function createSelectors(orm) {
      OrcusApp.select.app = (0, _reduxOrm.createSelector)(orm.OrcusApp);
      OrcusApp.select.appSlug = (0, _reduxOrm.createSelector)(orm.OrcusApp.slug);
    } // REDUCER

  }]);

  return OrcusApp;
}(_EnhancedModel2.EnhancedModel), _class.modelName = 'OrcusApp', _class.fields = {
  // non-relational fields
  // component props
  slug: (0, _reduxOrm.attr)(),
  //string, required
  id: (0, _reduxOrm.attr)(),
  icon: (0, _reduxOrm.attr)(),
  name: (0, _reduxOrm.attr)(),
  opened: (0, _reduxOrm.attr)() //bool

}, _class.options = {
  idAttribute: "slug"
}, _class.defaultProps = {
  id: DEFAULT_ID,
  icon: "fa:home",
  name: "",
  opened: false
}, _class.select = {}, _class.slice = (0, _toolkit.createSlice)({
  name: 'OrcusAppSlice',
  initialState: undefined,
  reducers: {
    createApp: function createApp(App, action) {
      App.create(Object.assign({}, OrcusApp.defaultProps, action.payload));
    },
    updateAppProp: function updateAppProp(App, action) {
      App.requireId(action.payload.slug).set(action.payload.prop, action.payload.value);
    },
    updateApp: function updateApp(App, action) {
      App.requireId(action.payload.slug).update(action.payload.props);
    },
    openApp: function openApp(App, action) {
      App.requireId(action.payload.slug).set("opened", true);
    },
    closeApp: function closeApp(App, action) {
      App.requireId(action.payload.slug).set("opened", false);
    },
    destroyApp: function destroyApp(App, action) {
      App.requireId(action.payload.slug)["delete"]();
    }
  }
}), _temp); //export OrcusApp class

var _default = OrcusApp; //export actions

exports["default"] = _default;
var _OrcusApp$slice$actio = OrcusApp.slice.actions,
    createApp = _OrcusApp$slice$actio.createApp,
    updateAppProp = _OrcusApp$slice$actio.updateAppProp,
    updateApp = _OrcusApp$slice$actio.updateApp,
    openApp = _OrcusApp$slice$actio.openApp,
    closeApp = _OrcusApp$slice$actio.closeApp,
    destroyApp = _OrcusApp$slice$actio.destroyApp; //export DEFAULT_ID constant for default id functionality in render layer

exports.destroyApp = destroyApp;
exports.closeApp = closeApp;
exports.openApp = openApp;
exports.updateApp = updateApp;
exports.updateAppProp = updateAppProp;
exports.createApp = createApp;