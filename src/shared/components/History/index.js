import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from './../../state';
import { Actionbar } from './Actionbar';
import { Graph } from './Graph';

const mapStateToProps = (state) => ({
    practiceHistory: state.atom.practiceHistory
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export class History extends Component {
    componentDidMount() {
        this.props.getHistory();
    }

    render() {
        const { practiceHistory } = this.props;

        const stream = practiceHistory
            .map(round => Object.assign({}, round, {
                formattedTimeStamp: new Date(parseInt(round.timestamp)).toISOString().split('T')[0].toString()
            }))
            .map((round, i) => (
            <li className="activity" key={i}>
                <div>Round completed at {round.formattedTimeStamp}</div>
                <div>with {round.accuracy}% accuracy and at {round.wpm} words per minute.</div>
            </li>
        ));

        const wpmData = practiceHistory.map(round => parseInt(round.wpm));
        const accuracyData = practiceHistory.map(round => parseInt(round.accuracy));

        const data = {
            wpmData, accuracyData
        };

        return (
            <div id="history-container" className="center">
                <Actionbar />
                <div className="history">
                    <div id="history-graph">
                        <Graph data={data} />
                    </div>
                    <div id="history-stream">
                        <ul>
                            {stream}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}