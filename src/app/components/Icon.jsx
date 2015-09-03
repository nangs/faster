'use strict';

import React from 'react';

export default React.createClass({
  propTypes: {
      svg: React.PropTypes.string.isRequired,
  },
  render() {
    return (
      <i svg={null} dangerouslySetInnerHTML={{__html: ''}}></i>
    );
  }
});
