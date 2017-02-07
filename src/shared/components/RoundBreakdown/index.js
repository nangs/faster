import React, { Component } from 'react';
import Statistics from './Statistics';
import { Actionbar } from './Actionbar';

export default class RoundBreakdown extends Component {
    render() {
        return (
            <div id="round-breakdown">
                <Actionbar />
                <Statistics />
            </div>
        )
    }
}