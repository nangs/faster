'use strict';

import {
	EventEmitter
}
from 'events';
import _ from 'underscore';
import {DefaultDispatchedActionHandlerMatcher} from './DispatchedActionHandler';
const CHANGE_EVENT = 'change';

export default class Store extends EventEmitter {
	constructor(dispatcher, handlers) {
		super();
		this.dispatchedActionHandlers = [].concat(handlers);
		this.setMaxListeners(0);
		this.dispatcher = dispatcher;
		this.dispatchToken = dispatcher.register(handleDispatchedActions.bind(this));
	}
	emitChange() {
		this.emit(CHANGE_EVENT);
	}
	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}
	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
	isInBag(bag, id, fields) {
		if (!bag[id]) {
			return false;
		}
		if (!fields) {
			return true;
		}
		var item = bag[id];
		return Object.keys(item);
	}
	mergeIntoBag(bag, entities, transform) {
		if (!transform) {
			transform = (value) => {
				return value;
			};
		}
		_.each(Object.keys(entities), (key) => {
			if (!bag.hasOwnProperty(key)) {
				bag[key] = transform(entities[key]);
			} else if (bag[key] !== entities[key]) {
				bag[key] = transform(_.extend(bag[key], entities[key]));
			}
		});
	}
}

function handleDispatchedActions(payload) {
	var self = this;
	var matchSpecification = new DefaultDispatchedActionHandlerMatcher(payload);
	var actionsRun = _.chain(this.dispatchedActionHandlers)
		.filter((handler)=>{
			return matchSpecification.isAMatch(handler);
		})
		.each((handler) => {
			handler.run(self, payload.action);
		})
		.value();
	if (actionsRun.length > 0) {
		this.emitChange();
	}
}
