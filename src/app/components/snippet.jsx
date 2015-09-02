'use strict';

import React from 'react';
import languages from './../constants/languages';

export default React.createClass({
	mixins: [],
	componentDidMount: componentDidMount,
	getInitialState: function(){
		return {
      snippet : getNextSnippet()
		}
	},
	render: function () {
    var snippetMarkup = this.state.snippet.split('').map(function(character, index){
      return (<span key={index}> {character} </span>)
    });

		return (<div className="snippet">
      <p> {snippetMarkup} </p>
    </div>)
	}
});

function componentDidMount() {
  getNextSnippet();
}

function getNextSnippet(){
  var property = pickRandomProperty(languages);
  var language = languages[property];
  var snippet = pickRandomSnippet(language);
  return snippet;
}

function pickRandomSnippet(language){
  var index = (Math.round(Math.random())) % language.length
  return language[index];
}

function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}
