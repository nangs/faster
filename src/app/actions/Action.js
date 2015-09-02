'use strict';

export default class Action {
	constructor(actionType, payload) {
		this.actionType = actionType;
		this.payload = payload;
	}
	is(actionType) {
		return this.actionType === actionType;
	}
}
