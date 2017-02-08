import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    history: state.atom.history
});

@connect(mapStateToProps)
export class History extends Component {
    render() {
        return (
            <div>History</div>
        )
    }
}