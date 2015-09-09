'use strict';

import React from 'react';
import Pie from './Pie';
import Gauge from './Gauge';

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
			<Gauge value={wpm} size={20} radius={100} label="WPM"
								sections={["#8cc152", "#ffb74d", "#ffb74d", "#e84528", "#e84528", "#e84528"]}
								arrow={{height: 60, width: 6, color: "#ccc"}}
								legend={['0', '20', '40', '60', '80', '100+']}/>
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
