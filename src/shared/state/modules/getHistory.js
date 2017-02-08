import axios from 'axios';
import { createAction } from 'redux-actions';

const GET_HISTORY = 'GET_HISTORY';

const action = createAction(GET_HISTORY, history => ({ history }));

export const getHistory = () => (dispatch, getState) => {
    const { user } = getState().atom;

    axios.post('/api/getHistory', { userId: user.id })
        .then(res => {
            console.log(res.data);
            dispatch(action(res.data))
        }).catch(err => {

        });
};

const reducer = (state, action) => {
    return {
        ...state,
        history: action.history
    }
};

export default {
    [GET_HISTORY]: reducer
};