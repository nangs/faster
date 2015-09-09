'use strict';

import React from 'react';
import ReactDom from 'react-dom'
import ArcGauge from './ArchGauge';

export default React.createClass({
	mixins: [],
	componentDidMount: componentDidMount,
	getInitialState: getInitialState,
	getDefaultProps: getDefaultProps,
  componentWillReceiveProps(nextProps) {
    let history = this.state.history || new Array(100).fill(0);

    if (history.length > 100) {
      history.shift();
    }

    history.push(nextProps.value);

    this.setState({
      history: history,
      width: ReactDom.findDOMNode(this).offsetWidth
    })
  },
  render() {
    let cls = 'gauge';
    return (
        <section className={cls}>
          <ArcGauge value={this.props.value}
                    size={this.props.size}
                    radius={this.props.radius}
                    sections={this.props.sections}
                    arrow={this.props.arrow}
                    label={this.props.label}
                    legend={this.props.legend}
                    width={this.state.width}/>
        </section>
    );
  }
});

function componentDidMount(){
	this.setState({
		width: ReactDom.findDOMNode(this).offsetWidth
	});
}

function getInitialState(){
	return {
		width: 212
	}
}

function getDefaultProps(){
	return {
		value: 0,
		size: 15,
		radius: 85,
		sections: ['#ccc', '#999', '#444'],
		arrow: null,
		label: null,
		legend: null
	}
}
