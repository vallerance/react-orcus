/* eslint-disable strict */
/* Desktop.unit.test.js
 * Test Desktop component api
 * Dependencies: checkPropTypes util, mocha context
 * Author: Joshua Carter
 * Created: December 7, 2019
 */
'use strict';
//include dependencies
var Desktop =
        require('../../../../dist/packages/react-orcus/build/index.js').Desktop,
    checkProp = new (require('../util/checkPropTypes.util.js'))(Desktop);

//begin mocha tests
describe('<Desktop /> PropTypes should', function () {
    it('Accept shortcuts prop', function () {
        checkProp.checkBooleanProp('shortcuts');
    });

    it('Accept taskbar prop', function () {
        // should be one of boolean or position
        checkProp.assertInvalidPropTypeEnum('taskbar', 64);
        checkProp.assertInvalidPropTypeEnum('taskbar', 'not-a-position');
        checkProp.assertValidPropType('taskbar', 'top');
        checkProp.assertValidPropType('taskbar', 'right');
        checkProp.assertValidPropType('taskbar', 'bottom');
        checkProp.assertValidPropType('taskbar', 'left');
        checkProp.assertValidPropType('taskbar', false);
        checkProp.assertValidPropType('taskbar', true);
    });

    it('Accept programMenu prop', function () {
        checkProp.checkBooleanProp('programMenu');
    });
});
