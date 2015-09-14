'use strict';

import React from 'react';

export default React.createClass({
	mixins: [],
	getDefaultProps: () => {
		return {
			selected: "Options...",
			options: [],
			selectionAction: () => {}
		}
	},
	getInitialState: () => {
		return { show: false }
	},
	render: function () {

		let {selected, options, action} = this.props;

		let isShown = {
			display: this.state.show ? "block" : "none"
		}

		var optionsMarkup = options.map((option, index)=>{
			return (<div key={index} className="option" onClick={createAction.bind(this, action, option)}>{option}</div>)
		});

		return (<div className="dropdown" onClick={viewDropdown.bind(this)}>
							<div className="selected"><span>{selected}</span></div>
							<div className="caret"></div>
							<div style={isShown} className="options">{optionsMarkup}</div>
						</div>)
	}
});

function viewDropdown(){
	this.setState({
		show: !this.state.show
	});
}

function createAction(action, option){
	action.selectOption(option);
}
