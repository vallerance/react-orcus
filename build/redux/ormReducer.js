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

var _OrcusApp = _interopRequireDefault(require("./models/OrcusApp.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function registerModel(orm, model) {
  orm.register(model);

  if (typeof model.createSelectors == "function") {
    model.createSelectors(orm);
  }
}

var orm = new _reduxOrm.ORM({
  stateSelector: function stateSelector(state) {
    return state;
  }
});
exports.orm = orm;
registerModel(orm, _OrcusApp["default"]); // use custom updater that calls slice reducer for each model

var ormReducer = (0, _reduxOrm.createReducer)(orm, function (session, action) {
  session.sessionBoundModels.forEach(function (modelClass) {
    if (typeof modelClass.slice.reducer === 'function') {
      modelClass.slice.reducer(modelClass, action);
    }
  });
});
var _default = ormReducer;
exports["default"] = _default;