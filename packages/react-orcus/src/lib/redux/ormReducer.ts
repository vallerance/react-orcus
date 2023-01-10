import { Slice } from '@reduxjs/toolkit';
import { createReducer, ORM } from 'redux-orm';

import Desktop from './models/Desktop';
import { Model, Orm, Schema } from './models/Model';
import OrcusApp from './models/OrcusApp';

const orm = new ORM<Schema>({
    stateSelector: state => state,
});

const ormType = () => new Orm<Schema>();
type OrmInstance = ReturnType<typeof ormType>;

function registerModels(models: [typeof Desktop, typeof OrcusApp]) {
    // register models
    orm.register(...models);
    // perform additional actions
    for (let i = 0; i < models.length; i++) {
        const model = models[i];
        // create selectors for models
        if (typeof model.createSelectors == 'function') {
            model.createSelectors(orm as OrmInstance);
        }
    }
}

registerModels([Desktop, OrcusApp]);

// use custom updater that calls slice reducer for each model
const ormReducer = createReducer<Schema>(orm, function (session, action) {
    (
        session.sessionBoundModels as unknown as (typeof Model & {
            slice: Slice;
        })[]
    ).forEach(modelClass => {
        if (typeof modelClass.slice.reducer === 'function') {
            modelClass.slice.reducer(modelClass, action);
        }
    });
});

export default ormReducer;
export { orm };
