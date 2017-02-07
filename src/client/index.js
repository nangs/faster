import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import App from './../shared/components/App';
import configureStore from './../shared/store';
import './assets/stylesheets/index.less';

const initialState = window.__INITIAL_STATE__;

const store = configureStore({
    initialState: initialState
});

const mountNode = document.getElementById('app');
ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    mountNode
);