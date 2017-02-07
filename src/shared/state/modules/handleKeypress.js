import { createAction } from 'redux-actions';
import KeyCode from './../../constants/KeyCode';
import { keyboard, shiftKeyboard } from './../../constants/Keyboard';
import { SNIPPETS } from './../../constants/Languages';
import { CORRECT, INCORRECT, UNVISITED } from './../../constants/SnippetStates';
import { DEFAULT_STATE } from './reducer';

const START_ROUND = 'START_ROUND';
const TOGGLE_SHIFT = 'TOGGLE_SHIFT';
const RECORD_TYPO_TYPE = 'RECORD_TYPO_TYPE';
const SET_INDEX = 'SET_INDEX';
const ROUND_COMPLETED = 'ROUND_COMPLETED';

const startRound = createAction(START_ROUND, language => ({ language }));
const setShift = createAction(TOGGLE_SHIFT, isShift => ({ isShift }));
const recordTypoType = createAction(RECORD_TYPO_TYPE, (index, type) => ({ index, type }));
const setIndex = createAction(SET_INDEX, index => ({ index }));
const roundCompleted = createAction(ROUND_COMPLETED);

export const handleKeypress = (keyCode, shiftKey) => (dispatch, getState) => {
    const currentState = getState().atom;

    const { hasStarted, index, snippet, isShift, language } = currentState;

    const key = shiftKey ? shiftKeyboard[keyCode] : keyboard[keyCode];

    const roundHasNotStarted = !hasStarted;
    const shiftWasOnlyKeyPressed = shiftKey && keyCode === KeyCode.Shift;

    if(roundHasNotStarted) {
        if(keyCode === KeyCode.Enter) {
            dispatch(startRound(language));
        }
    } else if(shiftWasOnlyKeyPressed) {
        dispatch(setShift(!isShift));
    } else {
        if(keyCode === KeyCode.BackSpace) {
            if (index > 0)
                dispatch(recordTypoType(index - 1, UNVISITED));
                dispatch(setIndex(index - 1))
        } else {
            const typoType = key === snippet[index] ? CORRECT : INCORRECT;
            dispatch(recordTypoType(index, typoType));
            dispatch(setIndex(index + 1))
        }
        dispatch(setShift(false));
        const newIndex = getState().atom.index;

        const roundComplete = newIndex === snippet.length;
        if(roundComplete) {
            dispatch(roundCompleted())
        }
    }
};

const handleSetIndex = (state, action) => {
    return {
        ...state,
        index: action.index
    }
};

const handleStartRound = (state, action) => {
    const { language } = action;

    const snippets = SNIPPETS[language];
    const snippet = snippets[ Math.round(Math.random()) % snippets.length];

    const typos = Array.apply(null, { length: snippet.length }).map(() => UNVISITED);

    return {
        ...state,
        hasStarted: true,
        beginTime: new Date().getTime(),
        wpm: 0,
        accuracy: 0,
        snippet: snippet,
        typos: typos
    };
};

const handleSetShift = (state, action) => {
    return {
        ...state,
        isShift: action.isShift
    }
};

const handleRecordTypoType = (state, action) => {
    const { index, type } = action;

    const typos = state.typos.map((typoType, i) => i === index ? type : typoType);

    return {
        ...state,
        index: index,
        typos: typos
    };
};

const handleRoundCompleted = (state, action) => Object.assign({}, state, DEFAULT_STATE);

export default {
    [START_ROUND]: handleStartRound,
    [TOGGLE_SHIFT]: handleSetShift,
    [RECORD_TYPO_TYPE]: handleRecordTypoType,
    [SET_INDEX]: handleSetIndex,
    [ROUND_COMPLETED]: handleRoundCompleted
}

const getWPM = (beginTime, index) => {
    let totalTime = (new Date).getTime() - beginTime;
    if(totalTime === 0) return 0;
    return Math.round(10000 * index / (5 * totalTime));
};

const getAccuracy = (typos) => {
    let occurences = _.countBy(typos);
    let c = occurences[CORRECT] || 0;
    let i = occurences[INCORRECT] || 0;
    if(i === 0 && c === 0) return 0;
    let percentage = 100 * (c / (c + i));
    return Math.round(percentage);
};
