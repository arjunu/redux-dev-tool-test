import React from 'react';
import {connect} from 'react-redux';
import Counter from '../components/Counter'

export class CounterPage extends React.Component {

    render() {
        const {value, dispatch} = this.props;

        return (
            <Counter
                value={value}
                onIncrement={() => dispatch({type: 'INCREMENT'})}
                onDecrement={() => dispatch({type: 'DECREMENT'})}
                onIncrementIfOdd={() => dispatch({type: 'INCREMENT_IF_ODD'})}
                onIncrementAsync={() => dispatch({type: 'INCREMENT_ASYNC'})}/>
        );
    }
};

export function mapStateToProps(state) {
    console.log("msp", state);
    return {
        value: state.counter.get("count")
    };
}

export default connect(mapStateToProps)(CounterPage);
