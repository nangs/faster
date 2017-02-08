import axios from 'axios';
import { createAction } from 'redux-actions';

const GET_HISTORY = 'GET_HISTORY';

const action = createAction(GET_HISTORY, practiceHistory => ({ practiceHistory }));

export const getHistory = () => (dispatch, getState) => {
    const { user } = getState().atom;

    axios.post('/api/getHistory', { userId: user.id })
        .then(res => {
            dispatch(action(res.data))
        }).catch(err => {

        });
};

const reducer = (state, action) => {
    return {
        ...state,
        practiceHistory: action.practiceHistory
    }
};

export default {
    [GET_HISTORY]: reducer
};