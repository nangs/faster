'use strict';

import React from 'react';
import Pie from './Pie';
import Speedometer from './Speedometer';

export default React.createClass({
	mixins: [],
	componentDidMount: componentDidMount,
	getInitialState: getInitialState,
	getDefaultProps: getDefaultProps,
	render: function () {
		let {show, accuracy, wpm} = this.props;
		let display = {
			display: this.props.show ? "block" : "none"
		}

		return (<div className="statistics" style={display}>
			<Speedometer wpm={wpm} show={show}/>
			<Pie percentage={accuracy} show={show}/>
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
		show: true,
		accuracy: 100
	}
}
