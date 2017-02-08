import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Selectors } from './../../state';
import { Actionbar } from './Actionbar';
import AccuracyMeter from './AccuracyMeter';
import Meter from './Meter';

const mapStateToProps = (state) => ({
    wpm: state.atom.wpm,
    accuracy: Selectors.getAccuracy(state),
    show: state.atom.settings.showStatistics
});

@connect(mapStateToProps)
export default class RoundBreakdown extends Component {
    render() {
        const { wpm, accuracy, show } = this.props;
        const display = {
            display: show ? "block" : "none"
        };

        return (
            <div id="round-breakdown">
                <Actionbar />
                <div className="statistics center" style={display}>
                    {/*<Meter wpm={40} />*/}
                    <AccuracyMeter percentage={accuracy} show={show}/>
                </div>
            </div>
        )
    }
}