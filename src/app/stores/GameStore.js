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
  console.log("The Game store received the payload: ", keypressEvent);

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
	accuracy: 0
};

var game = {
	hasStarted: false,
	language: false,
	snippet: "",
	index: 0,
	suggestedKeys: [],
	typos: [],
	state: {}
};

let correct = {
	color: "green",
	sound: "correctfile",
}

let incorrect = {
	color: "red",
	sound: "incorrectfile"
}

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
var hasStarted = game.hasStarted;
var index = game.index;
var snippet = game.snippet;
var beginTime = 0;
var backspaceFrequency = 0;

function getNextState(event){

	var {keyCode, shiftKey} = event;

	var isCommand = _.contains(Keyboard.commands, keyCode);
	var key = shiftKey ? Keyboard.shiftKeyboard[keyCode] : Keyboard.keyboard[keyCode];

	console.log("KeyCode: ", keyCode);
	console.log("Key: ", key);
	console.log("Command: ", isCommand);

	if(!game.hasStarted && keyCode === KeyCode.Enter){
		game.hasStarted = true;
		console.log("Game has started: ", game.hasStarted);
	}
	else if(isCommand && keyCode === KeyCode.BackSpace && game.index > 0){

	}
	else{
		if(shiftKey && keyCode === KeyCode.Shift){
			//Shift has been pressed and the index should not increase
		}
		else if(key === game.snippet[game.index])
		{
			console.log(key, "is found at", game.snippet[game.index]);
			//character is correct
		}
		else{
			console.log(key, "is found NOT at", game.snippet[game.index]);
			//Character is incorrect
		}
		//Concern yourself with the next character in the snippet
		game.index++;
		//Calculate WPM and accuracy
		if(game.index === game.snippet.length){
			debugger;
				//Reset the game
				game.index = 0;
				//isTiming = false;
				game.hasStarted = false;
				console.log("Game Ended: ", game.hasStarted);
		}
		var suggestedKeys = getSuggestedKeys(key);
		console.log("suggestedKeys", suggestedKeys);
	}
}

function reset(){
	let newGame = {
		preformance : {
			hasStarted: false,
			beginTime: 0,
			backspaceFrequency: 0,
		},
		snippet: "This is the snippet",
		index: 0,
		typos: [],
		state: {}
	}
	return _.extendOwn(game, newGame);
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
