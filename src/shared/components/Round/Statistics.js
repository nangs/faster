import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccuracyMeter from './AccuracyMeter';
import Gauge from './Gauge';

const mapStateToProps = (state) => ({
    wpm: state.atom.wpm,
    accuracy: state.atom.accuracy,
    show: state.atom.settings.showStatistics
});

@connect(mapStateToProps)
export default class Statistics extends Component {
    render() {
        const { wpm, accuracy, show } = this.props;
        const display = {
            display: show ? "block" : "none"
        };

        return (
            <div className="statistics center" style={display}>
                {/*<Gauge value={wpm} size={20} radius={100} label="WPM"
                       sections={["#8cc152", "#ffb74d", "#ffb74d", "#e84528", "#e84528", "#e84528"]}
                       arrow={{height: 60, width: 6, color: "#ccc"}}
                       legend={['0', '20', '40', '60', '80', '100+']}
                />*/}
                <AccuracyMeter percentage={accuracy} show={show}/>
            </div>
        )
    }
}