/**
 * Konfigurace store včetně middlewares.
 */

/* global __DEVTOOLS__ */
import {createStore, applyMiddleware, compose} from 'redux'
// middleware
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import {createLogger} from 'redux-logger'

import rootReducer from './reducers/index'


const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true,
    predicate: (getState, action) => (action.type !== 'EVENT_SOURCE_RECEIVE')
});

let createStoreWithMiddleware;

if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
    const {persistState} = require('redux-devtools');
    createStoreWithMiddleware = compose(
        applyMiddleware(
            thunkMiddleware,
            promiseMiddleware,
            loggerMiddleware
        ),
        persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore)
} else {
    createStoreWithMiddleware = compose(
        applyMiddleware(thunkMiddleware, promiseMiddleware)
    )(createStore)
}

/**
 * Creates a preconfigured store.
 */
function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers/index', () => {
            const nextRootReducer = require('./reducers/index');

            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}


export default configureStore()