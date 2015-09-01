'use strict';

var logo = require('./../styles/assets/icon.png');

import React from 'react';
import Keyboard from './keyboard';
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
			<Keyboard />
		</div>;
	}
});

function componentDidMount() {

}
