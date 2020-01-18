/* Desktop.unit.test.js
 * Test Desktop component api
 * Dependencies: checkPropTypes util, mocha context
 * Author: Joshua Carter
 * Created: December 7, 2019
 */
"use strict";
//include dependencies
var Desktop = require('../../build/index.js').Desktop,
    checkProp = new (require('../util/checkPropTypes.util.js'))(Desktop);

//begin mocha tests
describe ('<Desktop /> PropTypes should', function () {
    it ("Accept shortcuts prop", function () {
        checkProp.checkBooleanProp("shortcuts");
    });

    it ("Accept taskbar prop", function () {
        checkProp.checkBooleanProp("taskbar");
    });

    it ("Accept programMenu prop", function () {
        checkProp.checkBooleanProp("programMenu");
    });
});
