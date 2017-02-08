import getProfile from './getProfile';
import login from './login';
import logout from './logout';
import handleKeypress from './handleKeypress';
import beginNewRound from './beginNewRound';
import getHistory from './getHistory';
import setLanguage from './setLanguage';
import selectLanguageFilter from './selectLanguageFilter';
import { LANGUAGES } from './../../constants/Languages';

const handlers = [
    getProfile,
    login,
    logout,
    handleKeypress,
    beginNewRound,
    getHistory,
    setLanguage,
    selectLanguageFilter
].reduce((output, handler) => Object.assign(output, handler), {});

export const DEFAULT_STATE = {
    packageNumber: '0.0.0.0000',
    hasStarted: false,
    beginTime: null,
    endTime: null,
    snippet: 'Press Enter to start.',
    isShift: false,
    typos: [],
    suggestedKeys: ['enter'],
    suggestedFinger: 'rpinky',
    settings: {
        showKeyboard: true,
        showStatistics: true,
        showHands: true
    },
    wpm: 0,
    accuracy: 100,
    language: null,
    languages: LANGUAGES,
    languageFilter: {
        text: ''
    },
    practiceHistory: []
};

export default (state = DEFAULT_STATE, action = {}) => {
    const { type, payload } = action;
    if(state !== DEFAULT_STATE) {
        state = Object.assign({}, DEFAULT_STATE, state);
    }
    return handlers[type] ? handlers[type](state, payload) : state;
}