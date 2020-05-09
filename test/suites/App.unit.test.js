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
});
