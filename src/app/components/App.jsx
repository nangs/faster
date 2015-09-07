'use strict';

import './App.less';

import React from 'react';
import Navigation from './Navigation';
import Pie from './Pie';
import Speedometer from './Speedometer';
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
				<div className="statistics">
					<Speedometer show={this.state.settings.showStatistics}/>
					<Pie percentage={this.state.stats.accuracy} show={this.state.settings.showStatistics}/>
				</div>
				<Snippet snippet={this.state.game.snippet} typos={this.state.game.typos} />
				<Hands />
				<Keyboard suggestedKeys={this.state.game.suggestedKeys}/>
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
	var [wpm, accuracy, hasStarted, snippet, typos, suggestedKeys, settings] = GameStore.getGame();
	return {
		game: {
			hasStarted: hasStarted,
			snippet: snippet,
			typos: typos,
			suggestedKeys: suggestedKeys
		},
		settings: settings,
		stats: {
			wpm: wpm,
			accuracy: accuracy
		}
	}
}
