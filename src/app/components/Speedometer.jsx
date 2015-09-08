'use strict';

import React from 'react';

export default React.createClass({
	mixins: [],
	componentDidMount: componentDidMount,
	getInitialState: getInitialState,
	getDefaultProps: getDefaultProps,
	render: function () {

    let portionToFill = {
      strokeDasharray: this.props.wpm + " 100"
    }

		return (<div className="words-per-minute">
			<svg viewBox="0 0 32 16">
				<defs>
					<clipPath id="cut-off-bottom">
						<rect x="0" y="-1px"></rect>
					</clipPath>
				</defs>
				<circle cx="16" cy="16" r="16" clipPath="url(#cut-off-bottom)" style={portionToFill}></circle>
			</svg>
			<span>{this.props.wpm}</span>
    </div>)
	}
});

function componentDidMount() {

}

function getInitialState(){
	return {}
}

function getDefaultProps(){
	return {
    wpm: 100
	}
}
