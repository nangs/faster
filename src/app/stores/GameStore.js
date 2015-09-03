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

var keypress = new DispatchedActionHandler(PayloadSources.View, KeyboardActionTypes.Keypress, (store, action) => {
	var keypressEvent = action.payload;
	if(keypressEvent.keyCode === KeyCode.BackSpace)
		keypressEvent.preventDefault();

  //console.log("The Game store received the payload: ", keypressEvent);

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
	snippet: "",
	suggestedKeys: [],
	typos: []
};

class GameStore extends Store {
	constructor(dispatcher) {
		super(dispatcher, [keypress]);
	}
	getGame() {
		return _extend(settings, performance, game);
	}
	getSnippet(){
		game.snippet = getNextSnippet();
		return game.snippet;
	}
}
export default new GameStore(AppDispatcher);

/*
Private methods
*/
const CORRECT = "correct";
const INCORRECT = "incorrect";
const UNVISITED = "unvisted";

var hasStarted = game.hasStarted;
var index = 0;

function getNextState(event){

	var {keyCode, shiftKey} = event;

	var isCommand = _.contains(Keyboard.commands, keyCode);
	var key = shiftKey ? Keyboard.shiftKeyboard[keyCode] : Keyboard.keyboard[keyCode];

	//console.log("KeyCode: ", keyCode);
	//console.log("Key: ", key);
	//console.log("Command: ", isCommand);

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
			//Shift has been pressed and the index should not increase
			index--;
		}
		else if(key === game.snippet[index])
		{
			game.typos[index] = CORRECT;
		}
		else{
			game.typos[index] = INCORRECT;
		}
		//Concern yourself with the next character in the snippet
		index++;
		//Calculate WPM and accuracy
		if(index === game.snippet.length){
			debugger;
				//Reset the game
				index = 0;
				game.typos = [];
				game.backspaceFrequency = 0;
				game.hasStarted = false;
				console.log("Game Ended: ", game.hasStarted);
		}
		game.suggestedKeys = getSuggestedKeys(game.snippet.charAt(index));
	}
	console.log("Game: ", game);
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
