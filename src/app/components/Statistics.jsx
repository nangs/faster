'use strict';

import React from 'react';

export default React.createClass({
	mixins: [],
	componentDidMount: componentDidMount,
	getInitialState: getInitialState,
	getDefaultProps: getDefaultProps,
	render: function () {
		let {wpm, accuracy, backspaceFrequency} = this.props.stats;

		return (<div className="statistics">
      <span>WPM: {wpm}</span>
			<span>Accuracy: {accuracy}%</span>
			<span>BackSpace: {backspaceFrequency}</span>
    </div>)
	}
});

function componentDidMount() {

}

function getInitialState(){
	return {}
}

function getDefaultProps(){
	return {
		stats: {
			wpm: 0,
			accuracy: 0,
			backspaceFrequency: 0
		}
	}
}
