import { createAction } from 'redux-actions';

const SELECT_LANGUAGE_FILTER = 'SELECT_LANGUAGE_FILTER';

export const selectLanguageFilter = createAction(SELECT_LANGUAGE_FILTER, langFilter => ({ langFilter }));

const reducer = (state, action) => {
    return {
        ...state,
        languageFilter: action.langFilter
    }
};

export default {
    [SELECT_LANGUAGE_FILTER]: reducer
}