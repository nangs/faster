import React, { Component } from 'react';
import ReactDom from 'react-dom'
import ArcGauge from './ArchGauge';

export default class Gauge extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            width: 212
        }
    }
    
    componentDidMount(){
        this.setState({
            width: ReactDom.findDOMNode(this).offsetWidth
        });
    }

    componentWillReceiveProps(nextProps) {
        const history = this.state.history || new Array(100).fill(0);

        if (history.length > 100) {
            history.shift();
        }

        history.push(nextProps.value);

        this.setState({
            history: history,
            width: ReactDom.findDOMNode(this).offsetWidth
        })
    }

    render() {
        return (
            <section className={'gauge'}>
                <ArcGauge value={this.props.value}
                          size={this.props.size}
                          radius={this.props.radius}
                          sections={this.props.sections}
                          arrow={this.props.arrow}
                          label={this.props.label}
                          legend={this.props.legend}
                          width={this.state.width}
                />
            </section>
        )
    }
};

Gauge.defaultProps = {
    value: 0,
    size: 15,
    radius: 85,
    sections: ['#ccc', '#999', '#444'],
    arrow: null,
    label: null,
    legend: null
};