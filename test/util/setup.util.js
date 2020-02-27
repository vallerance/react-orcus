/* setup.util.js
 * Setup global resources for tests
 * Dependencies: jsdom
 * Author: Joshua Carter
 * Created: August 25, 2017
 */

var jsdom = require('jsdom'),
    Enzyme = require('enzyme'),
    Adapter = require('enzyme-adapter-react-16');

// Create a fake DOM for testing
global.window = new jsdom.JSDOM().window;
global.self = window.self;
global.document = window.document;
global.HTMLElement = window.HTMLElement;
global.Node = window.Node;
global.CustomEvent = window.CustomEvent;
global.UIEvent = window.UIEvent;
global.navigator = window.navigator;

// Configure Enzyme
Enzyme.configure({ adapter: new Adapter() });
