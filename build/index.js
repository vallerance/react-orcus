/* index.js
 * Loads the react-orcus library
 * Dependencies: 
    - classes: 
 * Author: Joshua Carter
 * Created: January 18, 2020
 */
"use strict";
//include dependencies

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.App = exports.Desktop = undefined;

var _Desktop = require('./Desktop.js');

var _OrcusApp = require('./OrcusApp.js');

//export modules
exports.Desktop = _Desktop.Desktop;
exports.App = _OrcusApp.OrcusApp;
//export default

exports.default = {
    Desktop: _Desktop.Desktop,
    App: _OrcusApp.OrcusApp
};