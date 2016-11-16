import {fromJS} from 'immutable';

export default function home(state = fromJS({count: 0}), action) {
    switch (action.type) {
        case 'INCREMENT':
            for(let i=0; i<1000; i++){
                console.log("loop");
            }
            return state.update("count", count => count + 1)
        case 'INCREMENT_IF_ODD':
            return state.update("count", count => (count % 2 !== 0) ? count + 1 : count);
        case 'DECREMENT':
            return state.update("count", count => count - 1);
        default:
            return state
    }
}
