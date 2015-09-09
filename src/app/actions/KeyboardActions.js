'use strict';

import AppDispatcher from './../dispatcher/AppDispatcher';
import ActionTypes from './../constants/actions/KeyboardActions';
import Action from './Action';

class KeyboardActions {
  constructor(dispatcher, actions){
    this.dispatcher = dispatcher;
    this.actions = actions;
  }

  handleKeypress(keycode){
    this.dispatcher.handleViewAction(new Action(this.actions.Keypress, keycode));
  }
}

export default new KeyboardActions(AppDispatcher, ActionTypes);
