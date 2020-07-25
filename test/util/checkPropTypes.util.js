/* checkPropTypes.util.js
 * Utility methods for using the check-prop-types library
 * Dependencies: jsdom
 * Author: Joshua Carter
 * Created: December 7, 2019
 */

var assert = require('chai').assert,
    checkPropTypes = require('check-prop-types');

class Util {
    
    constructor (Component) {
        this.name = Component.name;
        this.propTypes = Component.propTypes;
    }
    
    _generatePropDescription ({
        prop, value,
        ofType=false, ofValue=false, withValue=false, required=false
    }) {
        var description = "";
        if (required) {
            description += "required ";
        }
        description += "prop `" + prop + "` ";
        if (ofType) {
            description += "of type `" + typeof value + "` ";
        }
        if (ofValue) {
            description += "of value `" + value + "` ";
        }
        if (withValue) {
            description += "with value " + value + " ";
        }
        return description.slice(0, -1);
    }
    
    _generateUnexpectedPassMessage (propDescription) {
        var propDesc = typeof propDescription == "string" ?
            propDescription :
            this._generatePropDescription(propDescription);
        return `Expected ${propDesc} to fail, but it passed instead`;
    }
    
    _generateUnexpectedFailMessage (propDescription, result) {
        var propDesc = typeof propDescription == "string" ?
            propDescription :
            this._generatePropDescription(propDescription);
        return `Expected ${propDesc} to pass, but it failed with: ${result}`;
    }
    
    _generateFailedPropMessage (propDescription) {
        var propDesc = typeof propDescription == "string" ?
            propDescription :
            this._generatePropDescription(propDescription);
        return `Failed prop type: Invalid ${propDesc} supplied to \`${this.name}\``;
    }
    
    _generateFailedTypeMessage (propDescription) {
        return `${this._generateFailedPropMessage(propDescription)}, expected `;
    }

    testProp (prop, value) {
        return checkPropTypes(
            {
                [prop]: this.propTypes[prop]
            },
            {
                [prop]: value
            },
            'prop',
            this.name
        );
    }
    
    assertInvalidProp (prop, value, propDescription, failedMessage) {
        var result = this.testProp(prop, value);
        assert.exists(
            result,
            this._generateUnexpectedPassMessage(propDescription)
        );
        assert.include(result, failedMessage);
    }
    
    assertInvalidPropType (prop, value) {
        var propDesc = this._generatePropDescription({prop, value, ofType: true});
        this.assertInvalidProp(
            prop,
            value,
            propDesc,
            this._generateFailedTypeMessage(propDesc)
        );
    }
    
    assertInvalidPropTypeEnum (prop, value) {
        var propDesc = this._generatePropDescription({prop, value});
        this.assertInvalidProp(
            prop,
            value,
            propDesc,
            this._generateFailedPropMessage(propDesc)
        );
    }
    
    assertInvalidPropEnum (prop, value) {
        var propDesc = this._generatePropDescription({prop, value, ofValue: true});
        this.assertInvalidProp(
            prop,
            value,
            propDesc,
            this._generateFailedTypeMessage(propDesc)
        );
    }
    
    assertInvalidPropMemberType (prop, value, memberIndex=0) {
        var propDesc = this._generatePropDescription({
                prop: `${prop}[${memberIndex}]`,
                value: value[memberIndex],
                ofType: true
            });
        this.assertInvalidProp(
            prop,
            value,
            propDesc,
            this._generateFailedTypeMessage(propDesc)
        );
    }
    
    assertMissingRequiredProp (prop, value) {
        this.assertInvalidProp(
            prop,
            value,
            {prop, value, withValue: true, required: true},
            `Failed prop type: The ${this._generatePropDescription({prop})} is marked as required in \`${this.name}\`, but its value is \`${value}\``
        );
    }
    
    assertValidPropType (prop, value) {
        var result = this.testProp(prop, value);
        assert.isUndefined(
            result,
            this._generateUnexpectedFailMessage({prop, value, withValue: true}, result)
        );
    }
    
    checkRequiredProp (prop) {
        this.assertMissingRequiredProp(prop, undefined);
    }
    
    checkBooleanProp (prop, required) {
        if (required) {
            this.checkRequiredProp(prop);
        }
        this.assertInvalidPropType(prop, "yes");
        this.assertValidPropType(prop, true); 
    }
    
    checkStringProp (prop, required) {
        if (required) {
            this.checkRequiredProp(prop);
        }
        this.assertInvalidPropType(prop, 1234);
        this.assertValidPropType(prop, "yes"); 
    }
    
}

module.exports = Util;
