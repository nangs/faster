'use strict';

import Store from './../lib/Store';
import KeyboardActionTypes from './../constants/actions/KeyboardActions';
import PayloadSources from './../constants/PayloadSources';
import DispatchedActionHandler from './../lib/DispatchedActionHandler';
import AppDispatcher from './../dispatcher/AppDispatcher';
import Languages from './../constants/languages';

var keypress = new DispatchedActionHandler(PayloadSources.View, KeyboardActionTypes.Keypress, (store, action) => {
	var keypressEvent = action.payload;
  console.log("The Game store received the payload: ", keypressEvent);
});

var game = {};
var game = {
	hasStarted: false,
	language: false,
	snippet: "",
	index: 0,
	suggestedKeys: [],
	typos: [],
	state: {}
};
class GameStore extends Store {
	constructor(dispatcher) {
		super(dispatcher, [keypress]);
	}
	getSnippet(){
		game.snippet = getNextSnippet();
		return game.snippet;
	}
}
export default new GameStore(AppDispatcher);
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
