/* index.js
 * Loads the react-orcus library
 * Dependencies: 
    - components: Desktop, OrcusApp
    - static assets: main.css styles
 * Author: Joshua Carter
 * Created: January 18, 2020
 */
"use strict"; //import static assets

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

var mainClasses = {
  "orcus-desktop": "orcus-desktop",
  "orcus-desktop-content": "orcus-desktop-content",
  "orcus-taskbar": "orcus-taskbar",
  "orcus-shortcut": "orcus-shortcut",
  "orcus-title-bar": "orcus-title-bar",
  "orcus-app": "orcus-app",
  minimized: "minimized",
  "orcus-title": "orcus-title",
  "orcus-controls": "orcus-controls",
  "orcus-button": "orcus-button",
  "orcus-client-area": "orcus-client-area",
  "orcus-resize-handle": "orcus-resize-handle",
  top: "top",
  right: "right",
  bottom: "bottom",
  left: "left",
  selected: "selected",
  "orcus-icon": "orcus-icon",
  "orcus-shortcuts": "orcus-shortcuts",
  active: "active",
  "orcus-ui": "orcus-ui"
};

require('load-styles')("/*  imported from main.css  */\n\n.orcus-desktop,\n.orcus-desktop * {\n    box-sizing: border-box;\n}\n\n.orcus-desktop {\n    position: relative;\n    width: 100%;\n    height: 100%;\n}\n\n.orcus-desktop-content {\n    overflow: hidden;\n    position: relative;\n    width: 100%;\n    height: 100%;\n}\n\n.orcus-taskbar {\n    background-color: #eee;\n    border-top: 2px #000 solid;\n    padding: 2px;\n    position: absolute;\n        bottom: 0;\n    width: 100%;\n    height: 30px;\n    z-index: 700;\n}\n\n.orcus-desktop-content .orcus-shortcut,\n.orcus-title-bar {\n    cursor: default;\n}\n\n.orcus-app,\n.orcus-title-bar {\n    border: 1px #000 solid;\n}\n\n.orcus-app.minimized {\n    display: none !important;\n}\n\n.orcus-app:focus {\n    outline: 0;\n    z-index: 500;\n}\n\n.orcus-title-bar {\n    background-color: #ccc;\n    font-size: 13px;\n    line-height: 13px;\n    overflow: hidden;\n    padding: 2px 10px;\n    width: 100%;\n    height: 20px;\n}\n\n.orcus-title-bar .orcus-title {\n    float: left;\n    font-family: calibri, sans-serif;\n    font-size: inherit;\n    margin: 0;\n    padding: 0;\n    width: calc(100% - 100px);\n}\n\n.orcus-controls {\n    float: right;\n    margin: 0;\n    text-align: right;\n    width: 100px;\n}\n\n.orcus-controls .orcus-button {\n    display: inline-block;\n    margin: 0 3px;\n    width: 13px;\n    height: 13px;\n}\n\n.orcus-client-area {\n    background-color: #ddd;\n    padding: 2px;\n    overflow: auto;\n    width: 100%;\n    height: calc(100% - 20px);\n}\n\n.orcus-resize-handle.top { cursor: n-resize !important; }\n.orcus-resize-handle.right { cursor: e-resize !important; }\n.orcus-resize-handle.bottom { cursor: s-resize !important; }\n.orcus-resize-handle.left { cursor: w-resize !important; }\n.orcus-resize-handle.top.right { cursor: ne-resize !important; }\n.orcus-resize-handle.bottom.right { cursor: se-resize !important; }\n.orcus-resize-handle.bottom.left { cursor: sw-resize !important; }\n.orcus-resize-handle.top.left { cursor: nw-resize !important; }\n\n.orcus-desktop-content .orcus-shortcut {\n    margin: 10px;\n    outline: none;\n    padding: 5px 1px;\n    text-align: center;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    -o-user-select: none;\n    user-select: none;\n    word-break: break-word;\n    width: 70px;\n}\n\n.orcus-desktop-content .orcus-shortcut.selected {\n    background-color: #e0e0e0;\n    border: 1px #bbb solid;\n}\n\n.orcus-desktop-content .orcus-shortcut .orcus-icon {\n    padding: 5px;\n}\n\n.orcus-desktop-content .orcus-shortcut .orcus-title {\n    margin: 0;\n}\n\n.orcus-taskbar .orcus-shortcuts {\n    display: -webkit-flex;\n    display: -moz-flex;\n    display: -ms-flex;\n    display: -o-flex;\n    display: flex;\n    width: 100%;\n    height: 100%;\n}\n\n.orcus-taskbar .orcus-shortcut {\n    background-color: #ddd;\n    border: 1px #000 solid;\n    cursor: default;\n    display: -webkit-flex;\n    display: -moz-flex;\n    display: -ms-flex;\n    display: -o-flex;\n    display: flex;\n    margin: 0 2px;\n    overflow: hidden;\n    height: 100%;\n}\n\n.orcus-taskbar .orcus-shortcut.active {\n    background-color: #eee;\n}\n\n.orcus-taskbar .orcus-shortcut .orcus-ui.orcus-icon {\n    display: inline-block;\n    margin: auto 3px;\n    height: 1.1em;\n}\n\n.orcus-taskbar .orcus-shortcut .orcus-title {\n    margin: auto 5px auto 0;\n    height: 1.2em;\n}\n"); //include dependencies


//export default
var _default = {
  Desktop: _Desktop.Desktop,
  App: _OrcusApp.OrcusApp
};
exports["default"] = _default;