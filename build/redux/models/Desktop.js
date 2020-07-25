/* Desktop.js
 * redux-orm model for a Desktop instance (top-level)
 * Dependencies: redux-orm, @reduxjs/toolkit, uuid modules, EnhancedModel class
 * Author: Joshua Carter
 * Created: April 19, 2020
 */
"use strict"; //import dependencies

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroyDesktop = exports.updateDesktop = exports.updateDesktopProp = exports.createDesktop = exports.blurApp = exports.focusApp = exports["default"] = void 0;

var _reduxOrm = require("redux-orm");

var _toolkit = require("@reduxjs/toolkit");

var _uuid = require("uuid");

var _EnhancedModel2 = require("./EnhancedModel.js");

var _class, _temp;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

//create our Desktop model
var Desktop = (_temp = _class = /*#__PURE__*/function (_EnhancedModel) {
  _inherits(Desktop, _EnhancedModel);

  var _super = _createSuper(Desktop);

  function Desktop() {
    _classCallCheck(this, Desktop);

    return _super.apply(this, arguments);
  }

  _createClass(Desktop, [{
    key: "toString",
    value: function toString() {
      return "Desktop: ".concat(this.id);
    }
    /**
     * Focus the given app (bluring the existing focused app).
     * @param {string} appSlug - the identifier of the app to focus
     */

  }, {
    key: "focusApp",
    value: function focusApp(appSlug) {
      // focus the given app
      this.set("focusedApp", appSlug);
    }
    /**
     * Blur the given app (leaving no app focused).
     * @param {string} appSlug - the identifier of the app to blue
     */

  }, {
    key: "blurApp",
    value: function blurApp(appSlug) {
      // if this app is currently focused
      if (this.focusedApp && this.focusedApp.slug == appSlug) {
        // blur it
        this.set("focusedApp", undefined);
      }
    }
  }], [{
    key: "getInitialStateFromProps",
    //return an initial state object that is derived from some component props
    value: function getInitialStateFromProps(props) {
      return Object.fromEntries(Object.entries(Object.assign({}, Desktop.defaultProps, props, {
        id: (0, _uuid.v4)()
      })).filter(function (it) {
        return it[0] in Desktop.fields;
      }));
    } // SELECTORS

  }, {
    key: "createSelectors",
    value: function createSelectors(orm) {
      Desktop.select.desktop = (0, _reduxOrm.createSelector)(orm.Desktop);
      Desktop.select.singleDesktop = (0, _reduxOrm.createSelector)(orm.Desktop, function (desktops) {
        if (desktops.length !== 1) {
          throw new Error("Expected session to contain exactly one desktop instance, but found ".concat(desktops.length, "."));
        }

        return desktops[0];
      });
      Desktop.select.focusedApp = (0, _reduxOrm.createSelector)(orm.Desktop.focusedApp);
    } // REDUCER

  }]);

  return Desktop;
}(_EnhancedModel2.EnhancedModel), _class.modelName = 'Desktop', _class.fields = {
  // non-relational fields
  // component props
  id: (0, _reduxOrm.attr)(),
  //number, required
  focusedApp: (0, _reduxOrm.oneToOne)('OrcusApp', 'focused')
}, _class.options = {
  idAttribute: "id"
}, _class.defaultProps = {
  id: "0"
}, _class.select = {}, _class.slice = (0, _toolkit.createSlice)({
  name: 'DesktopSlice',
  initialState: undefined,
  reducers: {
    focusApp: function focusApp(Desktop, action) {
      Desktop.requireId(action.payload.id).focusApp(action.payload.slug);
    },
    blurApp: function blurApp(Desktop, action) {
      Desktop.requireId(action.payload.id).blurApp(action.payload.slug);
    },
    createDesktop: function createDesktop(Desktop, action) {
      Desktop.create(Object.assign({}, Desktop.defaultProps, action.payload));
    },
    updateDesktopProp: function updateDesktopProp(Desktop, action) {
      Desktop.requireId(action.payload.id).set(action.payload.prop, action.payload.value);
    },
    updateDesktop: function updateDesktop(Desktop, action) {
      Desktop.requireId(action.payload.id).update(action.payload.props);
    },
    destroyDesktop: function destroyDesktop(Desktop, action) {
      Desktop.requireId(action.payload.id)["delete"]();
    }
  }
}), _temp); //export Desktop class

var _default = Desktop; //export actions

exports["default"] = _default;
var _Desktop$slice$action = Desktop.slice.actions,
    focusApp = _Desktop$slice$action.focusApp,
    blurApp = _Desktop$slice$action.blurApp,
    createDesktop = _Desktop$slice$action.createDesktop,
    updateDesktopProp = _Desktop$slice$action.updateDesktopProp,
    updateDesktop = _Desktop$slice$action.updateDesktop,
    destroyDesktop = _Desktop$slice$action.destroyDesktop;
exports.destroyDesktop = destroyDesktop;
exports.updateDesktop = updateDesktop;
exports.updateDesktopProp = updateDesktopProp;
exports.createDesktop = createDesktop;
exports.blurApp = blurApp;
exports.focusApp = focusApp;