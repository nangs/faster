import { createAction } from 'redux-actions';
import axios from 'axios';
import { getWordsPerMinute, getAccuracy } from './../utils';
import { DEFAULT_STATE } from './reducer';

const BEGIN_NEW_ROUND = 'BEGIN_NEW_ROUND';

export const action = createAction(BEGIN_NEW_ROUND);

export const beginNewRound = () => (dispatch, getState) => {
    const { endTime, beginTime, snippet, typos, user } = getState().atom;
    debugger;

    const wpm = getWordsPerMinute(beginTime, endTime, snippet);
    const accuracy = getAccuracy(typos);
    const timestamp = endTime;

    axios.post('/api/saveRound', {
        wpm, accuracy, timestamp, userId: user.id
    }).then(res => {
        console.log(res.data);
        debugger;
        dispatch(action());
    }).catch(err => {
        debugger;
        dispatch(action());
    });
};

const reducer = (state, action) => ({
    ...DEFAULT_STATE,
    user: state.user,
    auth: !!state.user
});

export default {
    [BEGIN_NEW_ROUND]: reducer
}