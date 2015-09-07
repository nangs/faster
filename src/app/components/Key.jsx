'use strict';

import React from 'react';
import _ from "underscore";
import {LETTER, SYMBOL, CONTROL, SPACEBAR} from './../constants/KeyType';

export default React.createClass({
	mixins: [],
	componentDidMount: componentDidMount,
	getInitialState: getInitialState,
	getDefaultProps: getDefaultProps,
	render: function () {
		var {
			suggestedKeys,
			defaultKey,
			shiftKey,
			size,
			type,
			side
		} = this.props;

		let isSpacebar = (type === SPACEBAR && suggestedKeys[0] === " ");
		let suggest = (isSpacebar || _.contains(suggestedKeys, defaultKey) || _.contains(suggestedKeys, shiftKey)) ? "suggest" : "";
		let parent = ["key", size, type, side, suggest].join(" ");

		var off = defaultKey;
		var on;
		if(type === SYMBOL){
			off = <span className="off">{defaultKey}</span>;
			on = <span className="on">{shiftKey}</span>;
		}

		return (<div className={parent}>
			{off} {on}
		</div>)
	}
});

function componentDidMount() {

}

function getInitialState(){
	return {};
}

function getDefaultProps(){
	return {
		suggestedKeys: [],
		defaultKey: "",
		shiftKey: "",
		size: "one",
		type: "symbol",
		side: ""
	}
}
