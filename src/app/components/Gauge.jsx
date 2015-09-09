'use strict';

import React from 'react';
import ReactDom from 'react-dom'
import ArcGauge from './ArchGauge';

export default React.createClass({
	mixins: [],
	componentDidMount: function(){
    this.setState({
      width: ReactDom.findDOMNode(this).offsetWidth
    });
  },
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
  getInitialState() {
    return {
      width: 212
    }
  },
  getDefaultProps() {
    return {
      value: 0,
      size: 15,
      radius: 85,
      sections: ['#ccc', '#999', '#444'],
      arrow: null,
      label: null,
      legend: null
    }
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
