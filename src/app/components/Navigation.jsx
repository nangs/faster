'use strict';

require('./../styles/assets/stopwatch.svg');
require('./../styles/assets/speedometer.svg');
require('./../styles/assets/keyboard.svg');
require('./../styles/assets/show-hands.svg');
require('./../styles/assets/audio.svg');
require('./../styles/assets/cancel.svg');

import React from 'react';
import SettingsActions from './../actions/SettingsActions';

export default React.createClass({
	mixins: [],
	componentDidMount: componentDidMount,
	getInitialState: function(){
		return {

		}
	},
	render: function (){
		return (
      <nav className="navigation">
				<img src="./stopwatch.svg" />
				<img src="./speedometer.svg" onClick={showStatistics.bind(this)}/>
				<img src="./audio.svg" />
				<img src="./keyboard.svg" />
				<img src="./show-hands.svg" />
      </nav>
    );
	}
});

function componentDidMount(){

}

function showStatistics(){
	SettingsActions.showStatistics();
}
