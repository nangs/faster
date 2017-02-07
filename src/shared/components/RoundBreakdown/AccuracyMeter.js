import React, { Component } from 'react';

export default class AccuracyMeter extends Component {
    render() {
        const { percentage } = this.props;
        const accuracy = percentage + "%";
        const portionToFill = {
            strokeDasharray: percentage + " 100"
        };

        return (
            <div className="accuracy">
                <svg viewBox="0 0 32 32">
                    <circle r="16" cx="16" cy="16" style={portionToFill} />
                </svg>
                <span>{accuracy}</span>
                <div className="label">accuracy</div>
            </div>
        )
    }
};

AccuracyMeter.defaultProps = {
    width: '100%'
};