'use strict';

import React from 'react';
import Prettify from './../lib/prettify';

export default React.createClass({
	mixins: [],
	getDefaultProps: getDefaultProps,
	render: function () {
		var snippetMarkup = this.props.snippet.split('').map((generateCharacter.bind(this)));
		return (<div className="snippet">
      <pre className="center">{snippetMarkup}</pre>
    </div>)
	}
});

function getDefaultProps(){
	return {
		snippet: "Default snippet prop",
		typos: []
	}
}

function generateCharacter(character, index){
	let charType = character.charCodeAt(0);
	let className = this.props.typos[index];
	if(charType===10)
		className += " newline";
	if(charType===9)
		className += " tab";
	return (<span key={index} className={className}>{character}</span>)
}
