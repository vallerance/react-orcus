/* index.js
 * Loads the react-orcus library
 * Dependencies: 
    - classes: 
 * Author: Joshua Carter
 * Created: January 18, 2020
 */
"use strict"; //include dependencies

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Desktop", {
  enumerable: true,
  get: function get() {
    return _Desktop.Desktop;
  }
});
Object.defineProperty(exports, "App", {
  enumerable: true,
  get: function get() {
    return _OrcusApp.OrcusApp;
  }
});
exports["default"] = void 0;

var _Desktop = require("./Desktop.js");

var _OrcusApp = require("./OrcusApp.js");

//export modules
//export default
var _default = {
  Desktop: _Desktop.Desktop,
  App: _OrcusApp.OrcusApp
};
exports["default"] = _default;