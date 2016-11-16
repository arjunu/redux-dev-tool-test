import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

export class HomePage extends React.Component {

    render() {
        return (
            <Link to="/counter">Counter</Link>
        );
    }
};


export default HomePage;
