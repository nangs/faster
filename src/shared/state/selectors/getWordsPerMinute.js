import { createSelector } from 'reselect';
import { getWordsPerMinute } from './../utils';

const beginTimeSelector = (state) => state.atom.beginTime;
const endTimeSelector = (state) => state.atom.endTime;
const snippetSelector = (state) => state.atom.snippet;

export default createSelector(
    [beginTimeSelector, endTimeSelector, snippetSelector],
    getWordsPerMinute
);