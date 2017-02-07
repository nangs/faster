import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from './../middleware/promiseMiddleware';

export default () => {
    return applyMiddleware(
        thunk,
        promiseMiddleware
    );
}