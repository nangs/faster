'use strict';

import AppDispatcher from './../dispatcher/AppDispatcher';
import ActionTypes from './../constants/actions/DropdownActions';
import Action from './Action';

class SettingsActions {
  constructor(dispatcher, actions){
    this.dispatcher = dispatcher;
    this.actions = actions;
  }

  selectOption(option){
    this.dispatcher.handleViewAction(new Action(this.actions.SelectOption, option));
  }
}

export default new SettingsActions(AppDispatcher, ActionTypes);
