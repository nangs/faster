'use strict';

import {
	Dispatcher
}
from 'flux';
import PayloadSources from './../constants/PayloadSources';

class AppDispatcher extends Dispatcher {
	handleViewAction(action) {
		console.log('view action', action);
		this.dispatch({
			source: PayloadSources.View,
			action: action
		});
	}
	handleServerAction(action) {
		console.log('server action', action);
		this.dispatch({
			source: PayloadSources.Server,
			action: action
		});
	}
}

export default new AppDispatcher();
