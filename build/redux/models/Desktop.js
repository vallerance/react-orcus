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

function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

//create our Desktop model
var Desktop = (_temp = (_focusUpdated = _classPrivateFieldLooseKey("focusUpdated"), _updateFocusQueue = _classPrivateFieldLooseKey("updateFocusQueue"), _getIndexedApps = _classPrivateFieldLooseKey("getIndexedApps"), _class = /*#__PURE__*/function (_EnhancedModel) {
  _inherits(Desktop, _EnhancedModel);

  var _super = _createSuper(Desktop);

  function Desktop() {
    var _this;

    _classCallCheck(this, Desktop);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    Object.defineProperty(_assertThisInitialized(_this), _getIndexedApps, {
      value: _getIndexedApps2
    });
    Object.defineProperty(_assertThisInitialized(_this), _updateFocusQueue, {
      value: _updateFocusQueue2
    });
    Object.defineProperty(_assertThisInitialized(_this), _focusUpdated, {
      writable: true,
      value: false
    });
    return _this;
  }

  _createClass(Desktop, [{
    key: "toString",
    value: function toString() {
      return "Desktop: ".concat(this.id);
    } // removes slug from focus queue and re-adds it using the provided method

  }, {
    key: "focusApp",
    value:
    /**
     * Focus the given app (bluring the existing focused app).
     * @param {string} appSlug - the identifier of the app to focus
     */
    function focusApp(appSlug) {
      // track this focus update
      _classPrivateFieldLooseBase(this, _focusUpdated)[_focusUpdated] = true;

      _classPrivateFieldLooseBase(this, _updateFocusQueue)[_updateFocusQueue](appSlug, Array.prototype.unshift);
    }
    /**
     * Blur the given app by altering its place in the focus queue.
     * This will leave the next app focused.
     * @param {string} appSlug - the identifier of the app to blur
     */

  }, {
    key: "blurApp",
    value: function blurApp(appSlug) {
      // track this focus update
      _classPrivateFieldLooseBase(this, _focusUpdated)[_focusUpdated] = true; // if this app isn't currently focused

      if (this._focusedApps.indexOf(appSlug) !== 0) {
        // then it is already blurred isn't it
        return;
      } // else, the app is focused

      /*
       * There has been some back and forth as to how blur should work:
       * 
       */

      /*
       * This sends it back one space in the queue:
       */
      //blur the app using custom method


      _classPrivateFieldLooseBase(this, _updateFocusQueue)[_updateFocusQueue](appSlug, function (slug) {
        return this.splice(1, 0, slug);
      });
      /**/

      /*
       * This sends it to the end of the queue:
       *
      //blur the app
      this.#updateFocusQueue(appSlug, Array.prototype.push);
       */

    }
    /**
     * Blur the given app by removing its focus state entirely.
     * Like blurApp(), this will leave the next app focused.
     * @param {string} appSlug - the identifier of the app to blur
     */

  }, {
    key: "removeAppFocus",
    value: function removeAppFocus(appSlug) {
      // track this focus update
      _classPrivateFieldLooseBase(this, _focusUpdated)[_focusUpdated] = true; //blur the app

      _classPrivateFieldLooseBase(this, _updateFocusQueue)[_updateFocusQueue](appSlug, function () {});
    }
  }, {
    key: "registerApp",
    value:
    /**
     * Update extra desktop-level props when an app is created.
     * @param {string} appSlug - the identifier of the app to register
     */
    function registerApp(appSlug) {
      // if our focus has been updated
      if (_classPrivateFieldLooseBase(this, _focusUpdated)[_focusUpdated]) {
        // then just add our app to the end of the focus queue
        _classPrivateFieldLooseBase(this, _updateFocusQueue)[_updateFocusQueue](appSlug, Array.prototype.push); // there is nothing more to do


        return;
      } // else, we should pay attention to the initial focused property
      // get indexed apps


      var indexedApps = _classPrivateFieldLooseBase(this, _getIndexedApps)[_getIndexedApps](),
          // sort keys into new queue
      newQueue = Object.keys(indexedApps).sort(function (a, b) {
        return indexedApps[a].initialFocused - indexedApps[b].initialFocused;
      }); // update queue


      this.set("_focusedApps", newQueue);
    }
    /**
     * Remove extra desktop-level info when an app is destroyed.
     * @param {string} appSlug - the identifier of the app to deregister
     */

  }, {
    key: "deregisterApp",
    value: function deregisterApp(appSlug) {
      // remove this app from our focus queue
      _classPrivateFieldLooseBase(this, _updateFocusQueue)[_updateFocusQueue](appSlug, function () {});
    }
  }], [{
    key: "getInitialStateFromProps",
    value: //return an initial state object that is derived from some component props
    function getInitialStateFromProps(props) {
      return Object.fromEntries(Object.entries(Object.assign({}, Desktop.defaultProps, props, {
        id: (0, _uuid.v4)(),
        _focusedApps: []
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
      Desktop.select.focusedAppSlug = (0, _reduxOrm.createSelector)(orm.Desktop._focusedApps, function (slugs) {
        // the first app will be the focused app
        return slugs[0];
      }); // requires extra third argument: appSlug
      // returns 1-indexed focus index of app

      Desktop.select.focusIndex = (0, _reduxOrm.createSelector)(orm.Desktop._focusedApps, function (state, id, appSlug) {
        return appSlug;
      }, function (slugs, appSlug) {
        // return index (1 indexed) of slug
        return slugs.indexOf(appSlug) + 1;
      });
    } // REDUCER

  }]);

  return Desktop;
}(_EnhancedModel2.EnhancedModel)), _class.modelName = 'Desktop', _class.fields = {
  // relational accessors
  // - apps: OrcusApp.desktop.apps
  // non-relational fields
  // component props
  id: (0, _reduxOrm.attr)(),
  //number, required
  // model props
  // a list of app slugs that is the focus queue
  // an app may be closed by still listed in the focus queue
  _focusedApps: (0, _reduxOrm.attr)() //array

}, _class.options = {
  idAttribute: "id"
}, _class.defaultProps = {
  id: "0",
  _focusedApps: null
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
}), _updateFocusQueue2 = function _updateFocusQueue2(appSlug, method) {
  var queue, index;

  if (typeof method != "function") {
    throw new Error("Desktop.__updateFocusQueue(): invalid array prototype method: ".concat(method, "."));
  } // first search for this app in the focus queue


  queue = this._focusedApps.slice();
  index = queue.indexOf(appSlug); // if our slug is already in the queue

  if (index >= 0) {
    //remove it from it's current place
    queue.splice(index, 1);
  } // update the given app's focus by apply method to queue


  method.call(queue, appSlug); // update queue

  this.set("_focusedApps", queue);
}, _getIndexedApps2 = function _getIndexedApps2() {
  return Object.fromEntries(this.apps.toModelArray().map(function (it) {
    return [it.slug, it];
  }));
}, _temp); //export Desktop class

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