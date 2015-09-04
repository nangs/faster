'use strict';

import Store from './../lib/Store';
import KeyboardActionTypes from './../constants/actions/KeyboardActions';
import PayloadSources from './../constants/PayloadSources';
import DispatchedActionHandler from './../lib/DispatchedActionHandler';
import AppDispatcher from './../dispatcher/AppDispatcher';

import _ from 'underscore';
import {keyboard, shiftKeyboard} from './../constants/Keyboard';
import KeyCode from './../constants/KeyCode';
import Languages from './../constants/Languages';
import Hands from './../constants/Hands';
import {CORRECT, INCORRECT, UNVISITED} from './../constants/SnippetStates';

var keypress = new DispatchedActionHandler(PayloadSources.View, KeyboardActionTypes.Keypress, (store, action) => {
	let keypressEvent = action.payload;

	if(keypressEvent.keyCode === KeyCode.BackSpace || keypressEvent.keyCode === KeyCode.Space)
		keypressEvent.preventDefault();

	getNextState(keypressEvent);
});


var settings = {
	playSounds: false,
	showHands: false,
	showKeyboard: false,
	isTiming: false,
	language: false
};

var stats = {
	wpm: 0,
	accuracy: 0,
	backspaceFrequency: 0
};

var game = {
	hasStarted: false,
	snippet: getNextSnippet(),
	suggestedKeys: [],
	typos: []
};

var index = 0;
var beginTime = 0;

class GameStore extends Store {
	constructor(dispatcher) {
		super(dispatcher, [keypress]);
	}
	getGame() {
		return {
			settings: settings,
			stats: stats,
			game: game
		};
	}
}
export default new GameStore(AppDispatcher);


function getNextState(event){

	var {keyCode, shiftKey} = event;

	var key = shiftKey ? shiftKeyboard[keyCode] : keyboard[keyCode];

	console.log("KeyCode: ", keyCode, " Key: ", key);

	if(!game.hasStarted){
		if(keyCode !== KeyCode.Enter) return;
		game.hasStarted = true;
		beginTime = (new Date).getTime();
		for(var i = 0; i < game.snippet.length; i++)
			game.typos[i] = UNVISITED;
		return
	}
	else if(isCommand && keyCode === KeyCode.BackSpace){
		if(index <= 0) return;
		game.typos[--index] = UNVISITED;
		stats.backspaceFrequency++;
	}
	else{
		if(shiftKey && keyCode === KeyCode.Shift){
			index--;
		}
		else if(key === game.snippet[index])
		{
			game.typos[index] = CORRECT;
		}
		else{
			game.typos[index] = INCORRECT;
		}
		index++;
		stats.wpm = getWPM();
		stats.accuracy = getAccuracy();
		game.suggestedKeys = getSuggestedKeys(game.snippet.charAt(index));

		if(index === game.snippet.length){
				//Reset the game
				index = 0;
				beginTime = 0;
				stats.wpm = 0;
				stats.accuracy = 0;
				stats.backspaceFrequency = 0;
				game.typos = [];
				game.snippet = getNextSnippet();
				game.hasStarted = false;
				console.log("Game Ended: ", game.hasStarted);
		}
	}
}

function getSuggestedKeys (character){
	for(var hand in Hands){
		for(var key in Hands[hand]){
			if(_.contains(Hands[hand][key], character))
				return Hands[hand][key];
		}
	}
}

function getWPM() {
    let totalTime = (new Date).getTime() - beginTime;
		if(totalTime === 0) return 0;
    return Math.round(game.snippet.length/totalTime * 7500);
}

function getAccuracy() {
		let occurences = _.countBy(game.typos);
		let c = occurences[CORRECT] || 0;
		let i = occurences[INCORRECT] || 0;
		if(i === 0 && c === 0) return 0;
    let percentage = 100 * (c / (c + i));
		return Math.round(percentage);
}

function getNextSnippet(){
  var property = pickRandomProperty(Languages);
  var language = Languages[property];
  var snippet = pickRandomSnippet(language);
  return snippet;
}

function pickRandomSnippet(language){
  var index = (Math.round(Math.random())) % language.length
  return language[index];
}

function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}
