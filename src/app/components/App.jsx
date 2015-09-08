'use strict';

import './App.less';

import React from 'react';
import Navigation from './Navigation';
import Statistics from './Statistics';
import Snippet from './Snippet';
import Hands from './Hands';
import Keyboard from './Keyboard';
import KeyboardActions from './../actions/KeyboardActions';
import GameStore from './../stores/GameStore';

export default React.createClass({
	mixins: [],
	componentDidMount: componentDidMount,
	getInitialState: function(){
		return getGame();
	},
	render: function () {
		return (<div className="container">
			<Navigation />
			<div id="game">
				<Statistics wpm={this.state.stats.wpm} accuracy={this.state.stats.accuracy} show={this.state.settings.showStatistics}/>
				<Snippet snippet={this.state.game.snippet} typos={this.state.game.typos} />
				<Keyboard isShift={this.state.game.isShift} suggestedKeys={this.state.game.suggestedKeys} show={this.state.settings.showKeyboard}/>
				<Hands finger={this.state.game.finger} show={this.state.settings.showHands}/>
			</div>
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
	this.setState(getGame());
}

function getGame(){
	var [wpm, accuracy, hasStarted, snippet, isShift, typos, suggestedKeys, finger, settings] = GameStore.getGame();
	return {
		game: {
			hasStarted: hasStarted,
			snippet: snippet,
			isShift: isShift,
			typos: typos,
			suggestedKeys: suggestedKeys,
			finger: finger
		},
		settings: settings,
		stats: {
			wpm: wpm,
			accuracy: accuracy
		}
	}
}
