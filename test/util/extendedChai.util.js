/* extendedChai.util.js
 * Chai customizations
 * Dependencies: modules, services, classes
 * Author: Joshua Carter
 * Created: March 7, 2020
 */
"use strict";

var chai = require('chai');

chai.use(function (_chai, utils) {
    var Assertion = chai.Assertion;
    
    /**
     * Asserts that the target is a number or a date in between the given start
     * and end numbers or dates. Inclusive by default.
     * @param {number} start - The start of the range
     * @param {number} end - The end of the range
     * @param {boolean} [inclusive=true] - Whether the range is inclusive or not
     */
    Assertion.addMethod('between', function (start, end, inclusive=true) {
        if (inclusive) {
            new Assertion(this._obj).to.be.at.least(start);
            new Assertion(this._obj).to.be.at.most(end);
        }
        else {
            new Assertion(this._obj).to.be.above(start);
            new Assertion(this._obj).to.be.below(end);
        }
    });
    
    /**
     * Asserts that the target is a number or a date roughly equal to the given
     * number or date within a given tolernace (default 1).
     * @param {number} n - Number to be about
     * @param {number} [tolernace=1] - How close the target has to be to the
        expected value
     */
    Assertion.addMethod('about', function (n, tolerance=1) {
        new Assertion(this._obj).to.be.between(n-tolerance, n+tolerance);
    });
    
    /**
     * Asserts `valueToCheck` is in between `start` and `end`. Inclusive by
        default.
     * @param {*} valueToCheck
     * @param {*} start - The start of the range
     * @param {*} end - The end of the range
     * @param {boolean} [inclusive=true] - Whether the range is inclusive or not
     */
    _chai.assert.isBetween = function (val, start, end, inclusive=true) {
        new Assertion(val).to.be.between(start, end, inclusive);
    };
    
    /**
     * Asserts `valueToCheck` is roughly equal to `valueToBeAbout`.
     * @param {*} valueToCheck
     * @param {*} valueToBeAbout
     * @param {number} [tolernace=1] - How close the target has to be to the
        expected value
     */
    _chai.assert.isAbout = function (val, n, tolerance=1) {
        new Assertion(val).to.be.about(n, tolerance);
    };
});

module.exports = chai;
