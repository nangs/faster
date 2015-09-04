'use strict';

import React from 'react';
import _ from "underscore";
import {LETTER, SYMBOL, CONTROL} from './../constants/KeyType';

export default React.createClass({
	mixins: [],
	componentDidMount: componentDidMount,
	getInitialState: getInitialState,
	getDefaultProps: getDefaultProps,
	render: function () {
		var {
			suggestions,
			defaultKey,
			shiftKey,
			size,
			type,
			side
		} = this.props;

		let suggest = (shouldSuggest(defaultKey, suggestions) || shouldSuggest(shiftKey, suggestions)) ? "suggest" : "";
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
		suggestions: [],
		defaultKey: "",
		shiftKey: "",
		size: "one",
		type: "symbol",
		side: ""
	}
}

function shouldSuggest(character, suggestions){
	return (_.contains(suggestions, character));
}
