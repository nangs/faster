'use strict';

import Store from './../lib/Store';
import KeyboardActionTypes from './../constants/actions/KeyboardActions';
import SettingsActionTypes from './../constants/actions/SettingsActions';
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

var showSettings = new DispatchedActionHandler(PayloadSources.View, SettingsActionTypes.ShowSettings, (store, action) => {
	let setting = action.payload;
	settings[setting] = !settings[setting];
});

let beginTime, wpm, accuracy;
let hasStarted, index, snippet, typos, suggestedKeys;
let settings = {
	showStatistics: true,
	showKeyboard: true,
	showHands: true
}
setup();

class GameStore extends Store {
	constructor(dispatcher) {
		super(dispatcher, [keypress, showSettings]);
	}
	getGame() {
		return [wpm, accuracy, hasStarted, snippet, typos, suggestedKeys, settings];
	}
}
export default new GameStore(AppDispatcher);


function getNextState(event){

	var {keyCode, shiftKey} = event;

	var key = shiftKey ? shiftKeyboard[keyCode] : keyboard[keyCode];

	if(!hasStarted){
		if(keyCode !== KeyCode.Enter) return;
		hasStarted = true;
		beginTime = (new Date).getTime();
		snippet = getNextSnippet();
		suggestedKeys = getSuggestedKeys(snippet.charAt(index));
	}
	else if(shiftKey && keyCode === KeyCode.Shift){

	}
	else{
		if(keyCode === KeyCode.BackSpace){
			if(index <= 0) return;
			typos[--index] = UNVISITED;
		}
		else if(key === snippet[index])
		{
			typos[index++] = CORRECT;
		}
		else{
			typos[index++] = INCORRECT;
		}
		wpm = getWPM();
		accuracy = getAccuracy();
		suggestedKeys = getSuggestedKeys(snippet.charAt(index));

		if(index === snippet.length) setup();
	}
}

function setup(){
	wpm = accuracy = hasStarted = beginTime = index = 0;
	snippet = "Press enter to start!";
	suggestedKeys = ["enter"];
	typos = Array.apply(null, {length: snippet.length}).map(() => {return UNVISITED;});
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
    return Math.round(snippet.length/totalTime * 7500);
}

function getAccuracy() {
		let occurences = _.countBy(typos);
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
