import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import stepReducer from '../reducers/steps';
import templateReducer from '../reducers/templates';
import contextReducer from '../reducers/contexts';
import testReducer from '../reducers/tests'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({ 
            auth: authReducer,
            steps: stepReducer,
            contexts: contextReducer,
            templates: templateReducer,
            tests: testReducer
        }),
        composeEnhancer(applyMiddleware(thunk))
    );
    return store;
}

