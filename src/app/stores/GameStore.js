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
import {LANGUAGES, SNIPPETS} from './../constants/Languages';
import Fingers from './../constants/Fingers';
import {CORRECT, INCORRECT, UNVISITED} from './../constants/SnippetStates';

/* Mutations */
var keypress = new DispatchedActionHandler(PayloadSources.View, KeyboardActionTypes.Keypress, (store, action) => {
	let keypressEvent = action.payload;
	if(keypressEvent.keyCode === KeyCode.BackSpace
		|| keypressEvent.keyCode === KeyCode.Space
		|| keypressEvent.keyCode === KeyCode.Tab)
		keypressEvent.preventDefault();

	getNextState(keypressEvent);
});

var showSettings = new DispatchedActionHandler(PayloadSources.View, SettingsActionTypes.ShowSettings, (store, action) => {
	let setting = action.payload;
	settings[setting] = !settings[setting];
});

var showDropdown = new DispatchedActionHandler(PayloadSources.View, SettingsActionTypes.ShowDropdown, (store, action) => {
	settings.showDropdown = !settings.showDropdown;
});

var setLanguage = new DispatchedActionHandler(PayloadSources.View, SettingsActionTypes.SelectLanguage, (store, action) => {
	settings.language = action.payload;
});

/* State */
let beginTime, wpm, accuracy;
let hasStarted, index, snippet, isShift, typos, suggestedKeys, suggestedFinger;
let settings = {
	showStatistics: true,
	showKeyboard: true,
	showHands: true,
	showDropdown: false,
	language: LANGUAGES[0],
	languages: LANGUAGES
};
setup();

/* Store */
class GameStore extends Store {
	constructor(dispatcher) {
		super(dispatcher, [keypress, showSettings, showDropdown, setLanguage]);
	}
	getGame() {
		return [wpm, accuracy, hasStarted, snippet, isShift, typos, suggestedKeys, suggestedFinger, settings];
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
		wpm = accuracy = 0;
		let snippets = SNIPPETS[settings.language];
		snippet = snippets[ Math.round(Math.random()) % snippets.length];
		typos = Array.apply(null, {length: snippet.length}).map(() => {return UNVISITED;});
		let suggestions = getSuggestions(snippet.charAt(index));
		suggestedKeys = suggestions.suggestedKeys;
		suggestedFinger = suggestions.suggestedFinger;
	}
	else if(shiftKey && keyCode === KeyCode.Shift){
		isShift = !isShift;
	}
	else{
		isShift = false;
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
		let suggestions = getSuggestions(snippet.charAt(index));
		if(suggestions){
			suggestedKeys = suggestions.suggestedKeys;
			suggestedFinger = suggestions.suggestedFinger;
		}
		if(index === snippet.length) setup();
	}
}

function setup(){
	hasStarted = beginTime = index = isShift = 0;
	snippet = 'Press enter to start!';
	suggestedKeys = ['enter'];
	suggestedFinger = 'rpinky';
	typos = [];
}

function getSuggestions (character){
	let charType = character.charCodeAt(0);
	if(charType===10)
		return { suggestedKeys: ["enter"], suggestedFinger: 'rpinky' }
	if(charType===9)
		return { suggestedKeys: ["tab"], suggestedFinger: 'lpinky' }

	for(var finger in Fingers){
			if(_.contains(Fingers[finger], character.toLowerCase()))
				return { suggestedKeys: Fingers[finger], suggestedFinger: finger };
	}
}

function getWPM() {
    let totalTime = (new Date).getTime() - beginTime;
		if(totalTime === 0) return 0;
    return Math.round(10000 * index / (5 * totalTime));
}

function getAccuracy() {
		let occurences = _.countBy(typos);
		let c = occurences[CORRECT] || 0;
		let i = occurences[INCORRECT] || 0;
		if(i === 0 && c === 0) return 0;
    let percentage = 100 * (c / (c + i));
		return Math.round(percentage);
}
