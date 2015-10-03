'use strict';

require('./styles/assets/icon.png');
require('./styles/assets/apple-icon-57x57.png');
require('./styles/assets/apple-icon-72x72.png');
require('./styles/assets/apple-icon-114x114.png');
require('./styles/assets/apple-icon-144x144.png');

import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App';

ReactDom.render(<App/>, document.getElementById('app'));
