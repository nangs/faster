'use strict';

import AppDispatcher from './../dispatcher/AppDispatcher';
import ActionTypes from './../constants/actions/SettingsActions';
import Action from './Action';

class SettingsActions {
  constructor(dispatcher, actions){
    this.dispatcher = dispatcher;
    this.actions = actions;
  }

  showSettings(setting){
    this.dispatcher.handleViewAction(new Action(this.actions.ShowSettings, setting));
  }

  selectOption(option){
    this.dispatcher.handleViewAction(new Action(this.actions.SelectLanguage, option));
  }
}

export default new SettingsActions(AppDispatcher, ActionTypes);
