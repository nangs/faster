import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Selectors } from './../../state';
import { Actionbar } from './Actionbar';
import Pie from './Pie';
import Meter from './Meter';

const mapStateToProps = (state) => ({
    wpm: Selectors.getWordsPerMinute(state),
    seriesData: Selectors.getAccuracy(state),
    show: state.atom.settings.showStatistics
});

@connect(mapStateToProps)
export default class RoundBreakdown extends Component {
    render() {
        const { wpm, accuracy, seriesData, show } = this.props;
        const display = {
            display: show ? "block" : "none"
        };

        return (
            <div id="round-breakdown">
                <Actionbar />
                <div className="statistics center" style={display}>
                    <Meter wpm={wpm} />
                    <Pie seriesData={seriesData} />
                </div>
            </div>
        )
    }
}