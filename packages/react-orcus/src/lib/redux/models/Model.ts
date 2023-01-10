import {
    createSlice,
    CreateSliceOptions,
    Selector,
    SliceCaseReducers,
    ValidateSliceCaseReducers,
} from '@reduxjs/toolkit';
import {
    createSelector as createOrmSelector,
    Model as OrmModel,
    ModelType as OrmModelType,
    ORM,
} from 'redux-orm';
import { AnyModel, ModelFieldMap } from 'redux-orm/Model';
import { IndexedModelClasses, ORMOpts, OrmState } from 'redux-orm/ORM';

import type Desktop from './Desktop';
import type OrcusApp from './OrcusApp';

export abstract class Model<
    MClass extends typeof AnyModel = typeof AnyModel,
    Fields extends ModelFieldMap = Record<string, unknown>
> extends OrmModel<MClass, Fields> {
    /**
     * Lookup an instance by id. If not found, throw an error.
     * @param {*} id - The id to lookup
     * @return {EnhancedModel} - The found instance
     * @throws {Error} - If the object is not found
     */
    static requireId(id: string) {
        // lookup id
        const found = this.withId(id);
        if (found) {
            return found;
        }
        throw new Error(
            `Required instance of ${this} not found with id: ${id}.`
        );
    }

    static createSlice<
        State,
        CaseReducers extends SliceCaseReducers<State>,
        Name extends string = string
    >(sliceOpts: CreateSliceOptions<State, CaseReducers, Name>) {
        /*
         * redux-toolkit 1.5 requires reducers to NOT return undefined.
         * However, standard redux-orm reducers return undefined.
         * Wrap this model's case reducers to NOT return undefined.
         *
         */
        Object.keys(sliceOpts.reducers).forEach((name: keyof CaseReducers) => {
            const original = sliceOpts.reducers[name];
            sliceOpts.reducers[name] = function (modelClass, ...rest) {
                // call original
                let result;
                if (typeof original == 'function') {
                    result = original(modelClass, ...rest);
                }
                // don't return undefined
                if (typeof result == 'undefined') {
                    result = null;
                }
                return result;
            } as ValidateSliceCaseReducers<
                State,
                CaseReducers
            >[keyof CaseReducers];
        });
        return createSlice(sliceOpts);
    }
}

// `any` type required by redux-orm
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ModelType<M extends new (props: any) => InstanceType<M>> =
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    OrmModelType<InstanceType<M>> & M;

export type ModelSelectorSpec<M extends Model> = {
    key: string;
    dependencies: Selector[];
    resultFunc: Selector;
    model: M;
};

class OrmImpl<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    I extends IndexedModelClasses<any, string | number | symbol>
> extends ORM<I> {}

export const Orm = OrmImpl as {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new <I extends IndexedModelClasses<any>>(opts?: ORMOpts<I>): OrmImpl<I> /*&
        OrmSession<I> */ /* & { [K in keyof I]: CustomModelType<I[K]> }*/ & {
        [K in keyof I]: ModelSelectorSpec<InstanceType<I[K]>>;
    };
};

export const createSelector = <
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    S extends IndexedModelClasses<any, string | number | symbol>,
    R
>(
    ...args: unknown[]
): Selector<OrmState<S>, R> => {
    // create selector
    // these types weren't very easy to figure out
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const selector = createOrmSelector(...args);
    // wrap types
    return (state: OrmState<S>, ...args: unknown[]): R => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return selector(state, ...args) as R;
    };
};

export type Schema = { Desktop: typeof Desktop; OrcusApp: typeof OrcusApp };
