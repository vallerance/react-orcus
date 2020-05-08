/* ormReducer.js
 * Reducer for the redux-orm model tree
 * Dependencies: redux-orm module, OrcusApp class
 * Author: Joshua Carter
 * Created: February 2, 2020
 */
"use strict";
//import dependencies
import { ORM, createReducer } from 'redux-orm';
import OrcusApp from './models/OrcusApp.js';

function registerModel (orm, model) {
    orm.register(model);
    if (typeof model.createSelectors == "function") {
        model.createSelectors(orm);
    }
}

const orm = new ORM({
    stateSelector: state => state,
});
registerModel(orm, OrcusApp);

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
