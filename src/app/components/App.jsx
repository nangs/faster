'use strict';

import './App.less';

import React from 'react';
import Navigation from './Navigation';
import Snippet from './Snippet';
import Keyboard from './Keyboard';
import KeyboardActions from './../actions/KeyboardActions';
import GameStore from './../stores/GameStore';

export default React.createClass({
	mixins: [],
	componentDidMount: componentDidMount,
	getInitialState: function(){
		return {
			snippet: GameStore.getSnippet()
		}
	},
	render: function () {
		return <div className="container">
			<Navigation />
			<Snippet snippet={this.state.snippet}/>
			<Keyboard />
		</div>;
	}
});

function componentDidMount() {
	GameStore.addChangeListener(handleGameStateUpdates.bind(this));

	document.addEventListener('keydown', function(event){
		KeyboardActions.handleKeypress(event);
	});
}

function handleGameStateUpdates(){
	this.setState({

	});
	var g = GameStore.getGame();
	console.log("G", g);
}
