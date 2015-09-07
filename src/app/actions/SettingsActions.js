'use strict';

import AppDispatcher from './../dispatcher/AppDispatcher';
import ActionTypes from './../constants/actions/SettingsActions';
import Action from './Action';

class SettingsActions {
  constructor(dispatcher, actions){
    this.dispatcher = dispatcher;
    this.actions = actions;
  }

  showStatistics(){
    this.dispatcher.handleViewAction(new Action(this.actions.ShowStatistics, event));
  }
}

export default new SettingsActions(AppDispatcher, ActionTypes)
