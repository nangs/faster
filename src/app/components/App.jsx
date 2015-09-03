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
		var game = GameStore.getGame();
		return {
			game: game.game,
			settings: game.settings,
			performance: game.performance
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
	var game = GameStore.getGame();
	this.setState({
		game: game.game,
		settings: game.settings,
		performance: game.performance
	});
}
