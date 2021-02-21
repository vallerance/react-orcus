/* EnhancedModel.js
 * Enhanced base redux-orm model class
 * Dependencies: redux-orm module
 * Author: Joshua Carter
 * Created: February 23, 2020
 */
"use strict";
//import dependencies
import { Model } from 'redux-orm';
import { createSlice } from '@reduxjs/toolkit';
//create our EnhancedModel model
var EnhancedModel = class extends Model {
    
    /**
     * Lookup an instance by id. If not found, throw an error.
     * @param {*} id - The id to lookup
     * @return {EnhancedModel} - The found instance
     * @throws {Error} - If the object is not found
     */
    static requireId (id) {
        // lookup id
        var found = this.withId(id);
        if (found) {
            return found;
        }
        throw new Error(
            `Required instance of ${this} not found with id: ${id}.`
        );
    }
    
    static createSlice (sliceSpec) {
        /*
         * redux-toolkit 1.5 requires reducers to NOT return undefined.
         * However, standard redux-orm reducers return undefined.
         * Wrap this model's case reducers to NOT return undefined.
         *
         */
        Object.keys(sliceSpec.reducers).forEach(name => {
            let original = sliceSpec.reducers[name];
            sliceSpec.reducers[name] = function (modelClass, ...rest) {
                // call original
                var result = original(modelClass, ...rest);
                // don't return undefined
                if (typeof result == "undefined") {
                    result = null;
                }
                return result;
            };
        });
        return createSlice(sliceSpec);
    }
    
};

//export EnhancedModel class
export { EnhancedModel };
