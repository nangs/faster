import { createSelector } from 'reselect';
import _ from 'lodash';
import { CORRECT, INCORRECT } from './../../constants/SnippetStates';

const typosSelector = (state) => state.atom.typos;

const accuracySelector = createSelector(
    [typosSelector],
    (typos) => {
        const occurences = _.countBy(typos);
        const c = occurences[CORRECT] || 0;
        const i = occurences[INCORRECT] || 0;
        if(i === 0 && c === 0)
            return 0;
        const percentage = 100 * (c / (c + i));
        return Math.round(percentage);
    }
);

export default createSelector(
    [accuracySelector],
    (accuracy) => [
        {
            y: accuracy,
            name: 'Correct'
        },
        {
            y: 100 - accuracy,
            name: 'Incorrect'
        }
    ]
);