/* testDom.util.js
 * Utilities for testing the DOM
 * Dependencies: jQuery, react-testing-library modules
 * Author: Joshua Carter
 * Created: May 3, 2020
 */
"use strict";
//import dependencies
var assert = require('../util/extendedChai.util.js').assert,
    jQuery = require('jquery'),
    rtl = require("@testing-library/react");

function focusApp (appElem) {
    // focus app (not triggered by click)
    /*
    if (document.activeElement && document.activeElement != appElem) {
        document.activeElement.blur();
    }
    */
    rtl.fireEvent.focus(appElem);    
    // click app title
    rtl.fireEvent.click(
        jQuery(appElem).find(".orcus-title-bar").get(0)
    );
}

function click (elem) {
    /*
    // find focused app, if any
    var focusedApp = document.activeElement.className.includes("orcus-app") ?
            document.activeElement :
            null,
        // find focused shortcut, if any
        focusedShortcut = document.activeElement.className.includes("orcus-shortcut") ?
            document.activeElement :
            null,
        // determine if we are an app
        ourApp = elem.closest(".orcus-app"),
        // determine if we are a shortcut
        ourShortcut = elem.closest(".orcus-shortcut");
    // if there is a focused app that is not ourselves
    if (focusedApp && focusedApp != ourApp) {
        // blur the focused app (not triggered by the click)
        focusedApp.blur();
    }
    // execute click
    rtl.fireEvent.click(elem);
    // if we are an app that isn't focused
    if (ourApp && ourApp != focusedApp) {
        // focus ourselves (not triggered by the click)
        ourApp.focus();
    }
    */
    /*
    // foucs ourselves (not triggered by the click)
    if (document.activeElement && document.activeElement != elem) {
        document.activeElement.blur();
    }
    */
    elem.focus();
    // execute click
    rtl.fireEvent.click(elem);
}

function assertFocusedIndex (appsWrapper, selector, index) {
    // get apps sorted by z-index, high to low
    var sortedApps = appsWrapper
            .find(".orcus-app")
            .get()
            .sort((a, b) => jQuery(b).css("z-index") - jQuery(a).css("z-index")),
        // convert negative indices
        index = index >= 0 ? index : sortedApps.length + index;
    // app should have given index in array sorted by z-index
    assert.indexOf(appsWrapper.find(selector).get(0), index, sortedApps);
}

function assertFocused (appsWrapper, selector) {
    // app should be focused
    assert.lengthOf(
        appsWrapper.find(`${selector}:focus`),
        1,
        "Missing focused app"
    );
    // app should have highest z-index
    assertFocusedIndex(appsWrapper, selector, 0);
}

module.exports.click = click;
module.exports.focusApp = focusApp;
module.exports.assertFocused = assertFocused;
module.exports.assertFocusedIndex = assertFocusedIndex;
