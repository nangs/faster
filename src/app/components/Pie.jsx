'use strict';

import React from 'react';

export default React.createClass({
	mixins: [],
	componentDidMount: componentDidMount,
	getInitialState: getInitialState,
	getDefaultProps: getDefaultProps,
	render: function () {
    let accuracy = this.props.percentage + "%";
    let portionToFill = {
      strokeDasharray: this.props.percentage + " 100"
    }
		let display = {
			display: this.props.show ? "inline-block" : "none"
		}

		return (<div className="accuracy" style={display}>
      <svg viewBox="0 0 32 32">
        <circle r="16" cx="16" cy="16" style={portionToFill} />
      </svg>
      <span>{accuracy}</span>
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
    percentage: 100,
		show: true
	}
}
