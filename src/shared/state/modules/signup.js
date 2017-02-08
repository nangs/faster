import axios from 'axios';
import { push } from 'react-router-redux';

export const signup = (credentials) => (dispatch) => {
    axios.post('/api/signUp', credentials)
        .then(response => {
            console.log('login success');
            dispatch(push('/round'));
        })
        .catch(error => {
            console.log('login failure', error);
        })
};