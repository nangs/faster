'use strict';

import React from 'react';

export default React.createClass({
	mixins: [],
	getDefaultProps: getDefaultProps,
	render: function () {
		var snippetMarkup = this.props.snippet.split('').map(generateCharacter.bind(this));
		return (<div className="snippet">
      <pre className="code center"> {snippetMarkup} </pre>
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
	return (<span key={index} className={this.props.typos[index]}> {character} </span>)
}
