import { createAction } from 'redux-actions';
import axios from 'axios';

const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
const PROFILE_FAILURE = 'PROFILE_FAILURE';

const success = createAction(PROFILE_SUCCESS, (user) => ({ user }));
const failure = createAction(PROFILE_FAILURE, () => ({}));

export const getProfile = (credentials) => (dispatch) => {
    console.log('retrieving user profile');
    axios.post('/api/userProfile', credentials)
        .then(response => {
            console.log('user profile retrieved', response.body);
            dispatch(success('user'));
        })
        .catch(error => {
            console.log('failed to retrieve user profile', error);
            dispatch(failure());
        })
};

export default { 
    [PROFILE_SUCCESS]: (state, payload) => ({ ...state, user: payload.user }),
    [PROFILE_FAILURE]: (state, payload) => ({ ...state, user: null })
}