/* ormReducer.js
 * Reducer for the redux-orm model tree
 * Dependencies: redux-orm module, OrcusApp class
 * Author: Joshua Carter
 * Created: February 2, 2020
 */
"use strict"; //import dependencies

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orm = exports["default"] = void 0;

var _reduxOrm = require("redux-orm");

var _Desktop = _interopRequireDefault(require("./models/Desktop.js"));

var _OrcusApp = _interopRequireDefault(require("./models/OrcusApp.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function registerModels(orm, models) {
  orm.register.apply(orm, _toConsumableArray(models));

  for (var i = 0; i < models.length; i++) {
    var model = models[i];

    if (typeof model.createSelectors == "function") {
      model.createSelectors(orm);
    }
  }
}

var orm = new _reduxOrm.ORM({
  stateSelector: function stateSelector(state) {
    return state;
  }
});
exports.orm = orm;
registerModels(orm, [_Desktop["default"], _OrcusApp["default"]]); // use custom updater that calls slice reducer for each model

var ormReducer = (0, _reduxOrm.createReducer)(orm, function (session, action) {
  session.sessionBoundModels.forEach(function (modelClass) {
    if (typeof modelClass.slice.reducer === 'function') {
      modelClass.slice.reducer(modelClass, action);
    }
  });
});
var _default = ormReducer;
exports["default"] = _default;