'use strict';

require('./../styles/assets/speedometer.svg');
require('./../styles/assets/keyboard.svg');
require('./../styles/assets/show-hands.svg');
require('./../styles/assets/audio.svg');
require('./../styles/assets/cancel.svg');

import React from 'react';
import Dropdown from './Dropdown';
import SettingsActions from './../actions/SettingsActions';
import {SHOWKEYBOARD, SHOWSTATISTICS, SHOWHANDS} from './../constants/Settings';

export default React.createClass({
	mixins: [],
	getDefaultProps: () => {
		return {
			showDropdown: false,
			languages: [],
			language: false
		}
	},
	render: function (){
		return (<nav className="navigation">
				<img src="./speedometer.svg" onClick={showStatistics.bind(this)}/>
				<img src="./audio.svg" />
				<img src="./keyboard.svg" onClick={showKeyboard.bind(this)}/>
				<img src="./show-hands.svg" onClick={showHands.bind(this)}/>
				<Dropdown selected={this.props.language} options={this.props.languages}/>
      </nav>)
	}
});

function showStatistics(){
	SettingsActions.showSettings(SHOWSTATISTICS);
}

function showKeyboard(){
	SettingsActions.showSettings(SHOWKEYBOARD);
}

function showHands(){
	SettingsActions.showSettings(SHOWHANDS);
}
