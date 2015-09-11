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
	render: function () {

		let {selected, options, showDropdown} = this.props;

		let isShownClass = "dropdown" + (showDropdown ? " show" : "");
		var optionsMarkup = options.map((language, index)=>{
			return (<div key={index} className="option" onClick={selectOption.bind(this, language)}>{language}</div>)
		});

		return (<div className={isShownClass} onClick={viewDropdown.bind(this)}>
							<div className="selected"><span>{selected}</span></div>
							<div className="caret"></div>
							<div className="options">{optionsMarkup}</div>
						</div>)
	}
});

function viewDropdown(){
	SettingsActions.showDropdown();
}

function selectOption(option){
	SettingsActions.selectOption(option);
}
