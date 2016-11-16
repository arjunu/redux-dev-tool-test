import {combineReducers} from 'redux';
// import counter from './A.reducer';
import home from './HomePage.reducer';
import {routerReducer} from 'react-router-redux';

export default function createReducer(asyncReducers) {
    const appReducer = combineReducers({
        routing: routerReducer,
        home,
        ...asyncReducers
    });

    return (state, action) => {
        return appReducer(state, action)
    };
};
