import { createAction } from 'redux-actions';
import axios from 'axios';
import { getWordsPerMinute, getAccuracy } from './../utils';
import { DEFAULT_STATE } from './reducer';

const BEGIN_NEW_ROUND = 'BEGIN_NEW_ROUND';

export const action = createAction(BEGIN_NEW_ROUND);

export const beginNewRound = () => (dispatch, getState) => {
    const { endTime, beginTime, snippet, typos, language, user } = getState().atom;

    const wpm = getWordsPerMinute(beginTime, endTime, snippet);
    const accuracy = getAccuracy(typos);
    const timestamp = endTime;

    axios.post('/api/saveRound', {
        wpm, accuracy, typos, snippet, language, timestamp, userId: user.id
    }).then(res => {
        dispatch(action());
    }).catch(err => {
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