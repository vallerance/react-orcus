/* setup.util.js
 * Setup global resources for tests
 * Dependencies: jsdom
 * Author: Joshua Carter
 * Created: August 25, 2017
 */

var jsdom = require('jsdom'),
    React = require('react');

// Create a fake DOM for test       ing
global.window = new jsdom.JSDOM().window;
global.self = window.self;
global.document = window.document;
global.HTMLElement = window.HTMLElement;
global.Node = window.Node;
global.CustomEvent = window.CustomEvent;
global.UIEvent = window.UIEvent;
global.navigator = window.navigator;
global.crypto = {
    randomUUID: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            function (c) {
                var r = (Math.random() * 16) | 0,
                    v = c == 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            }
        );
    },
};
Object.defineProperty(window, 'crypto', {
    value: crypto,
});
// replace react-hyperscript
global.h = React.createElement;
