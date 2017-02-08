import { createSelector } from 'reselect';
import { getAccuracy } from './../utils';

const typosSelector = (state) => state.atom.typos;

const accuracySelector = createSelector(
    [typosSelector],
    getAccuracy
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