'use strict';

export class DefaultDispatchedActionHandlerMatcher {
	constructor(payload) {
		this.source = payload.source;
		this.action = payload.action;
	}
	isAMatch(handler) {
		return this.source === handler.source && this.action.is(handler.actionType);
	}
}

export default class DispatchedActionHandler {
	constructor(source, actionType, run) {
		this.source = source;
		this.actionType = actionType;
		this.run = run;
	}
}
