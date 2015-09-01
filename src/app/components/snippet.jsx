'use strict';

import React from 'react';
import * as languages from './../constants/languages';

console.log(languages);

export default React.createClass({
	mixins: [],
	componentDidMount: componentDidMount,
	getInitialState: function(){
		return {
      snippet : "walker and friends are in the most time."
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

}
