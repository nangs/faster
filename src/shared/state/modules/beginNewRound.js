import { createAction } from 'redux-actions';
import { DEFAULT_STATE } from './reducer';

const BEGIN_NEW_ROUND = 'BEGIN_NEW_ROUND';

export const beginNewRound = createAction(BEGIN_NEW_ROUND);

const reducer = (state, action) => ({
    ...DEFAULT_STATE,
    user: state.user,
    auth: !!state.user
});

export default {
    [BEGIN_NEW_ROUND]: reducer
}