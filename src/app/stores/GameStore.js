'use strict';

import Store from './../lib/Store';
import KeyboardActionTypes from './../constants/actions/KeyboardActions';
import PayloadSources from './../constants/PayloadSources';
import DispatchedActionHandler from './../lib/DispatchedActionHandler';
import AppDispatcher from './../dispatcher/AppDispatcher';

var keypress = new DispatchedActionHandler(PayloadSources.View, KeyboardActionTypes.Keypress, (store, action) => {
	var keypressEvent = action.payload;
  console.log("The Game store received the payload: ", keypressEvent);
});

var game = {};
class GameStore extends Store {
	constructor(dispatcher) {
		super(dispatcher, [keypress]);
	}
}
export default new GameStore(AppDispatcher);
