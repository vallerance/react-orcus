/* setup.util.js
 * Setup global resources for tests
 * Dependencies: jsdom
 * Author: Joshua Carter
 * Created: August 25, 2017
 */

var jsdom = require('jsdom');

// Create a fake DOM for testing
global.window = new jsdom.JSDOM().window;
global.self = window.self;
global.document = window.document;
global.HTMLElement = window.HTMLElement;
global.Node = window.Node;
global.CustomEvent = window.CustomEvent;
global.UIEvent = window.UIEvent;
global.navigator = window.navigator;
