'use strict';

var logo = require('./../styles/assets/icon.png');
import './App.less';

import React from 'react';
import Snippet from './snippet';
import Keyboard from './keyboard';
import KeyboardActions from './../actions/KeyboardActions';
import GameStore from './../stores/GameStore';

export default React.createClass({
	mixins: [],
	componentDidMount: componentDidMount,
	getInitialState: function(){
		return {

		}
	},
	render: function () {
		return <div className="container">
			<Snippet />
			<Keyboard />
		</div>;
	}
});

function componentDidMount() {
	document.addEventListener('keydown', function(event){
		KeyboardActions.handleKeypress(event);
	});
}
