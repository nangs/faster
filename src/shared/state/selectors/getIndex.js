import { createSelector } from 'reselect';
import { getIndex } from './../utils';

const typosSelector = state => state.atom.typos;

export default createSelector(
    [typosSelector],
    (typos) => getIndex(typos)
);