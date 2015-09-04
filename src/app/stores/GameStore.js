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

var index = 0;
var beginTime = 0;
var settings, stats, game;
settings = stats = game = {};
setup();

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

	if(!game.hasStarted){
		if(keyCode !== KeyCode.Enter) return;
		game.hasStarted = true;
		beginTime = (new Date).getTime();
	}
	else if(shiftKey && keyCode === KeyCode.Shift){

	}
	else{
		if(keyCode === KeyCode.BackSpace){
			if(index <= 0) return;
			game.typos[--index] = UNVISITED;
			stats.backspaceFrequency++;
		}
		else if(key === game.snippet[index])
		{
			game.typos[index++] = CORRECT;
		}
		else{
			game.typos[index++] = INCORRECT;
		}
		stats.wpm = getWPM();
		stats.accuracy = getAccuracy();
		game.suggestedKeys = getSuggestedKeys(game.snippet.charAt(index));

		if(index === game.snippet.length){
				index = 0;
				beginTime = 0;
				setup();
		}
	}
}

function setup(){
	_.extend(stats, {
		wpm: 0,
		accuracy: 0,
		backspaceFrequency: 0
	});
	_.extend(game, {
		hasStarted: false,
		snippet: getNextSnippet(),
		suggestedKeys: [],
		typos: [],
		isShift: false
	});
	_.extend(game, {
		typos: Array.apply(null, {length: game.snippet.length}).map(() => {return UNVISITED;}),
		suggestedKeys: getSuggestedKeys(game.snippet.charAt(index))
	});
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
