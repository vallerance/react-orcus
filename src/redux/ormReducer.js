/* ormReducer.js
 * Reducer for the redux-orm model tree
 * Dependencies: redux-orm module, OrcusApp class
 * Author: Joshua Carter
 * Created: February 2, 2020
 */
"use strict";
//import dependencies
import { ORM, createReducer } from 'redux-orm';
import Desktop from './models/Desktop.js';
import OrcusApp from './models/OrcusApp.js';

function registerModels (orm, models) {
    // register models
    orm.register(...models);
    // perform additional actions
    for (let i=0; i<models.length; i++) {
        let model = models[i];
        // create selectors for models
        if (typeof model.createSelectors == "function") {
            model.createSelectors(orm);
        }
    }
}

const orm = new ORM({
    stateSelector: state => state,
});
registerModels(orm, [Desktop, OrcusApp]);

// use custom updater that calls slice reducer for each model
const ormReducer = createReducer(orm, function (session, action) {
    session.sessionBoundModels.forEach(modelClass => {
        if (typeof modelClass.slice.reducer === 'function') {
            modelClass.slice.reducer(modelClass, action);
        }
    });
});

export default ormReducer;
export { orm };
