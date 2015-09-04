'use strict';

import './App.less';

import React from 'react';
import Navigation from './Navigation';
import Statistics from './Statistics';
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
			stats: game.stats
		}
	},
	render: function () {
		return (<div className="container">
			<Navigation />
			<Statistics stats={this.state.stats} />
			<Snippet snippet={this.state.game.snippet} typos={this.state.game.typos} />
			<Keyboard />
		</div>);
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
	console.log(game);
	this.setState({
		game: game.game,
		settings: game.settings,
		stats: game.stats
	});
}
