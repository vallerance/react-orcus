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
exports.DEFAULT_ID = exports.destroyApp = exports.restoreApp = exports.minimizeApp = exports.closeApp = exports.openApp = exports.updateApp = exports.updateAppProp = exports.createApp = exports["default"] = void 0;

var _reduxOrm = require("redux-orm");

var _toolkit = require("@reduxjs/toolkit");

var _EnhancedModel2 = require("./EnhancedModel.js");

var _class, _temp;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

//define constants
var DEFAULT_ID = "ORCUS_APP_DEFAULT_ID_VALUE_68142"; //create our OrcusApp model

exports.DEFAULT_ID = DEFAULT_ID;
var OrcusApp = (_temp = _class = /*#__PURE__*/function (_EnhancedModel) {
  _inherits(OrcusApp, _EnhancedModel);

  var _super = _createSuper(OrcusApp);

  function OrcusApp() {
    _classCallCheck(this, OrcusApp);

    return _super.apply(this, arguments);
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
        return it[0] in OrcusApp.fields;
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
  opened: (0, _reduxOrm.attr)(),
  //bool
  minimized: (0, _reduxOrm.attr)(),
  //bool
  desktop: (0, _reduxOrm.fk)("Desktop", "apps")
}, _class.options = {
  idAttribute: "slug"
}, _class.defaultProps = {
  id: DEFAULT_ID,
  icon: "fa:home",
  name: "",
  opened: false,
  minimized: false
}, _class.select = {}, _class.slice = (0, _toolkit.createSlice)({
  name: 'OrcusAppSlice',
  initialState: undefined,
  reducers: {
    createApp: function createApp(App, action) {
      // get desktop id
      var session = App.session,
          desktopId = session.Desktop.select.singleDesktop(session).id;
      App.create(Object.assign({
        desktop: desktopId
      }, OrcusApp.defaultProps, action.payload));
    },
    updateAppProp: function updateAppProp(App, action) {
      App.requireId(action.payload.slug).set(action.payload.prop, action.payload.value);
    },
    updateApp: function updateApp(App, action) {
      App.requireId(action.payload.slug).update(action.payload.props);
    },
    openApp: function openApp(App, action) {
      // get our app
      var app = App.requireId(action.payload.slug); // open it

      app.set("opened", true); // focus it

      app.desktop.focusApp(action.payload.slug);
    },
    closeApp: function closeApp(App, action) {
      // get our app
      var app = App.requireId(action.payload.slug); // close it

      app.set("opened", false); // blur it

      app.desktop.blurApp(action.payload.slug);
    },
    minimizeApp: function minimizeApp(App, action) {
      App.requireId(action.payload.slug).set("minimized", true);
    },
    restoreApp: function restoreApp(App, action) {
      // get our app
      var app = App.requireId(action.payload.slug); // restore it

      app.set("minimized", false); // focus it

      app.desktop.focusApp(action.payload.slug);
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
    minimizeApp = _OrcusApp$slice$actio.minimizeApp,
    restoreApp = _OrcusApp$slice$actio.restoreApp,
    destroyApp = _OrcusApp$slice$actio.destroyApp; //export DEFAULT_ID constant for default id functionality in render layer

exports.destroyApp = destroyApp;
exports.restoreApp = restoreApp;
exports.minimizeApp = minimizeApp;
exports.closeApp = closeApp;
exports.openApp = openApp;
exports.updateApp = updateApp;
exports.updateAppProp = updateAppProp;
exports.createApp = createApp;