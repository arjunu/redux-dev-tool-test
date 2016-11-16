/*eslint-disable no-unused-vars*/
import "babel-polyfill"
import {Provider} from "react-redux";
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
// import sagaMonitor from './sagaMonitor'
import App from './components/App';
import HomePage from './routes/HomePage';
import {browserHistory, Router} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import createReducer from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware(/* {sagaMonitor} */);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    createReducer(),
    composeEnhancers(applyMiddleware(sagaMiddleware))
);
store.asyncReducers = {};
sagaMiddleware.run(rootSaga);
const history = syncHistoryWithStore(browserHistory, store);

function injectAsyncReducer(store) {
    return (name, asyncReducer) => {
        store.asyncReducers[name] = asyncReducer;
        store.replaceReducer(createReducer(store.asyncReducers));
    };
}

const createRoutes = store => {
    console.log(store);
    const injectReducer = injectAsyncReducer(store);

    return [
        {
            path: 'counter',
            getComponent(location, cb) {
                require.ensure(['./routes/CounterPage'],
                    require => {
                        const CounterPage = require('./routes/CounterPage').default;

                        injectReducer('counter', require('./reducers/CounterPage.reducer').default);
                        cb(null, CounterPage);
                    });
            }
        }
    ];
};

const rootRoute = {
    path: '/',
    component: App,
    indexRoute: {
        component: HomePage
    },
    childRoutes: createRoutes(store)
};

function render() {
    ReactDOM.render(
        <Provider store={store}>
            <Router routes={rootRoute} history={history}/>
        </Provider>,
        document.getElementById('root')
    )
}

render();