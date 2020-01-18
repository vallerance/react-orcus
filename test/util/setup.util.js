/* setup.util.js
 * Setup global resources for tests
 * Dependencies: jsdom
 * Author: Joshua Carter
 * Created: August 25, 2017
 */

var jsdom = require('jsdom');
// Create a fake DOM for testing
global.window = new jsdom.JSDOM().window;
global.document = window.document;
global.HTMLElement = window.HTMLElement;
global.Node = window.Node;
global.UIEvent = window.UIEvent;
global.navigator = window.navigator;
