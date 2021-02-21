/* App.unit.test.js
 * Test App component api
 * Dependencies: checkPropTypes util, mocha context
 * Author: Joshua Carter
 * Created: December 7, 2019
 */
"use strict";
//include dependencies
var App = require('../../build/components/OrcusApp.js').OrcusAppUnit,
    checkProp = new (require('../util/checkPropTypes.util.js'))(App);

//begin mocha tests
describe ('<App /> PropTypes should', function () {
    it ("Require name", function () {
        checkProp.checkStringProp("name", true);
    });
    
    it ("Require slug", function () {
        checkProp.checkStringProp("slug", true);
    });
    
    it ("Accept icon", function () {
        checkProp.checkStringProp("icon");
    });

    it ("Accept initialOpened", function () {
        checkProp.checkBooleanProp("initialOpened");
    });

    it ("Accept initialPosition", function () {
        checkProp.assertInvalidPropType("initialPosition", "top-right");
        checkProp.assertInvalidPropMemberType("initialPosition", ["top", "right"]);
        checkProp.assertValidPropType("initialPosition", [0, 1000, 100, 100]);
    });
    
    it ("Accept initialFocused", function () {
        // should be one of boolean or position
        checkProp.assertInvalidPropTypeEnum("initialFocused", {"a": 64});
        checkProp.assertInvalidPropTypeEnum("initialFocused", "not-a-position");
        checkProp.assertValidPropType("initialFocused", 1);
        checkProp.assertValidPropType("initialFocused", 0);
        checkProp.assertValidPropType("initialFocused", 2);
        checkProp.assertValidPropType("initialFocused", 33);
        checkProp.assertValidPropType("initialFocused", false);
        checkProp.assertValidPropType("initialFocused", true);
    });
});
