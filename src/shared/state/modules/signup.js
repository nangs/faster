import axios from 'axios';

export const signup = (credentials) => (dispatch) => {
    axios.post('/api/signUp', credentials)
        .then(response => {
            console.log('login success');
        })
        .catch(error => {
            console.log('login failure', error);
        })
};