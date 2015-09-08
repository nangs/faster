'use strict';

import React from 'react';

export default React.createClass({
	mixins: [],
	componentDidMount: componentDidMount,
	getInitialState: getInitialState,
	getDefaultProps: getDefaultProps,
	render: function () {
    let portionToFill = {
      strokeDasharray: "95 189"
    }

		return (<div className="words-per-minute">
			<svg viewBox="0 0 32 16">
				<defs>
					<clipPath id="cut-off-bottom">
						<rect x="0" y="-1px"></rect>
					</clipPath>
				</defs>
				<circle cx="16" cy="16" r="16" clipPath="url(#cut-off-bottom)"></circle>
			</svg>
			<span> 0 WPM</span>
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
    percentage: 100
	}
}
