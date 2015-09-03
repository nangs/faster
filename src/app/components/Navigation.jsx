'use strict';

require('./../styles/assets/wrench.svg');
require('./../styles/assets/gear.svg');
require('./../styles/assets/chart.svg');
require('./../styles/assets/speedometer.svg');
require('./../styles/assets/stopwatch.svg');
require('./../styles/assets/keyboard.svg');
require('./../styles/assets/show-hands.svg');
require('./../styles/assets/audio.svg');
require('./../styles/assets/cancel.svg');

import React from 'react';

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
        <img src="./wrench.svg" />
				<img src="./gear.svg" />
				<img src="./chart.svg" />
				<img src="./speedometer.svg" />
				<img src="./stopwatch.svg" />
				<img src="./audio.svg" />
				<img src="./keyboard.svg" />
				<img src="./show-hands.svg" />
      </nav>
    );
	}
});

function componentDidMount(){

}
