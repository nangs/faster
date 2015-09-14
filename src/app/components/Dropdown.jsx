'use strict';

import React from 'react';
import SettingsActions from './../actions/SettingsActions';

export default React.createClass({
	mixins: [],
	getDefaultProps: () => {
		return {
			selected: "Options...",
			options: [],
			showDropdown: false
		}
	},
	getInitialState: () => {
		return { show: false }
	},
	render: function () {

		let {selected, options, showDropdown} = this.props;

		let isShown = {
			display: this.state.show ? "block" : "none"
		}

		var optionsMarkup = options.map((language, index)=>{
			return (<div key={index} className="option" onClick={selectOption.bind(this, language)}>{language}</div>)
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

function selectOption(option){
	SettingsActions.selectOption(option);
}
