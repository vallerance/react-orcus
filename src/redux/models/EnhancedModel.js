/* EnhancedModel.js
 * Enhanced base redux-orm model class
 * Dependencies: redux-orm module
 * Author: Joshua Carter
 * Created: February 23, 2020
 */
"use strict";
//import dependencies
import { Model } from 'redux-orm';
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
    
};

//export EnhancedModel class
export { EnhancedModel };
