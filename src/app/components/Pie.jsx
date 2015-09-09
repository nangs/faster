'use strict';

import React from 'react';

export default React.createClass({
	mixins: [],
	getDefaultProps: getDefaultProps,
	render: function () {
    let accuracy = this.props.percentage + "%";
    let portionToFill = {
      strokeDasharray: this.props.percentage + " 100"
    }

		return (<div className="accuracy">
      <svg viewBox="0 0 32 32">
        <circle r="16" cx="16" cy="16" style={portionToFill} />
      </svg>
      <span>{accuracy}</span>
			<div className="label">accuracy</div>
    </div>)
	}
});

function getDefaultProps(){
	return {
    percentage: 100
	}
}
