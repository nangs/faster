'use strict';

import Store from './../lib/Store';
import KeyboardActionTypes from './../constants/actions/KeyboardActions';
import PayloadSources from './../constants/PayloadSources';
import DispatchedActionHandler from './../lib/DispatchedActionHandler';
import AppDispatcher from './../dispatcher/AppDispatcher';

import _ from 'underscore';
import Keyboard from './../constants/Keyboard';
import KeyCode from './../constants/KeyCode';
import Languages from './../constants/Languages';
import Hands from './../constants/Hands';
import {CORRECT, INCORRECT, UNVISITED} from './../constants/SnippetStates';

var keypress = new DispatchedActionHandler(PayloadSources.View, KeyboardActionTypes.Keypress, (store, action) => {
	let keypressEvent = action.payload;

	if(keypressEvent.keyCode === KeyCode.BackSpace)
		keypressEvent.preventDefault();

	getNextState(keypressEvent);
});


var settings = {
	playSounds: false,
	showHands: false,
	showKeyboard: false,
	isTiming: false
};

var preformance = {
	wpm: 0,
	accuracy: 0,
	backspaceFrequency: 0
};

var game = {
	hasStarted: false,
	language: false,
	snippet: getNextSnippet(),
	suggestedKeys: [],
	typos: []
};

class GameStore extends Store {
	constructor(dispatcher) {
		super(dispatcher, [keypress]);
	}
	getGame() {
		return {
			settings: settings,
			performance: performance,
			game: game
		};
	}
}
export default new GameStore(AppDispatcher);


function getNextState(event){

	var {keyCode, shiftKey} = event;

	var isCommand = _.contains(Keyboard.commands, keyCode);
	var key = shiftKey ? Keyboard.shiftKeyboard[keyCode] : Keyboard.keyboard[keyCode];

	console.log("KeyCode: ", keyCode, " Key: ", key);

	if(!game.hasStarted){
		if(keyCode !== KeyCode.Enter) return;
		game.hasStarted = true;
		for(var i = 0; i < game.snippet.length; i++)
			game.typos[i] = UNVISITED;
		return
	}
	else if(isCommand && keyCode === KeyCode.BackSpace && index > 0){
		index--;
		game.typos[index] = UNVISITED;
		preformance.backspaceFrequency++;
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
		//Calculate WPM and accuracy
		if(index === game.snippet.length){
				//Reset the game
				index = 0;
				game.typos = [];
				game.backspaceFrequency = 0;
				game.snippet = getNextSnippet();
				game.hasStarted = false;
				console.log("Game Ended: ", game.hasStarted);
		}
		game.suggestedKeys = getSuggestedKeys(game.snippet.charAt(index));
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

function getWPM(length, beginTime) {
    var currentTime = (new Date).getTime();
    var totalTime = currentTime - beginTime;
    return Math.round(length/totalTime * 7500);
}

function getAccuracy() {
		var numberTypos = 0;
		for(var i = 0; i < game.typos.length; i++){
				if(game.typos[i] == true){
						numberTypos++;
				}
		}
    return 1 - (numberTypos/game.snippet.length);
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
