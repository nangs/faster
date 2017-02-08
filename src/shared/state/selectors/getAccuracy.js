import { createSelector } from 'reselect';
import _ from 'lodash';
import { CORRECT, INCORRECT } from './../../constants/SnippetStates';

const typosSelector = (state) => state.atom.typos;

export default createSelector(
    [typosSelector],
    (typos) => getAccuracy(typos)
);

const getAccuracy = (typos) => {
    const occurences = _.countBy(typos);
    const c = occurences[CORRECT] || 0;
    const i = occurences[INCORRECT] || 0;
    if(i === 0 && c === 0)
        return 0;
    const percentage = 100 * (c / (c + i));
    return Math.round(percentage);
};
