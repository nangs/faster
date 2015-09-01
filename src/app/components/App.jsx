'use strict';

var logo = require('./../styles/assets/icon.png');

import React from 'react';
import Snippet from './snippet';
import Keyboard from './keyboard';
import KeypressEventHandler from './../KeypressEventHandler'
import './App.less';

export default React.createClass({
	mixins: [],
	componentDidMount: componentDidMount,
	getInitialState: function(){
		return {

		}
	},
	render: function () {
		return <div className="container">

			<Snippet />
			<Keyboard />
		</div>;
	}
});

function componentDidMount() {
	console.log(KeypressEventHandler);
	document.addEventListener('keydown', KeypressEventHandler);
}
