import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions, Selectors } from './../../state';
import { Actionbar } from './Actionbar';
import { Graph } from './Graph';

const mapStateToProps = (state) => ({
    practiceHistory: Selectors.getPracticeHistory(state)
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export class History extends Component {
    componentDidMount() {
        this.props.getHistory();
    }

    render() {
        const { practiceHistory } = this.props;

        const stream = practiceHistory.map((round, i) => (
            <li className="activity" key={i}>
                <div className="activity-card">
                    <div className="stats">
                        <div className="tile">
                            <div className="fa fa-bullseye">
                                <div className="label">Accuracy</div>
                            </div>
                            <div>
                                <span className="value">{round.accuracy}</span>
                                <span className="unit">%</span>
                            </div>
                        </div>
                        <div className="tile">
                            <div className="fa fa-tachometer">
                                <div className="label">Speed</div>
                            </div>
                            <div>
                                <span className="value">{round.wpm}</span>
                                <span className="unit">WPM</span>
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <div>
                            {round.formattedTimeStamp}
                        </div>
                    </div>
                </div>
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