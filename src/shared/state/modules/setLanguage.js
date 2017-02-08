import { createAction } from 'redux-actions';

const SET_LANGUAGE = 'SET_LANGUAGE';

export const setLanguage = createAction(SET_LANGUAGE, lang => ({ lang }));

const reducer = (state, action) => ({
    ...state,
    language: action.lang
});

export default {
    [SET_LANGUAGE]: reducer
}