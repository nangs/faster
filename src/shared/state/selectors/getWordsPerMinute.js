import { createSelector } from 'reselect';

const beginTimeSelector = (state) => state.atom.beginTime;
const endTimeSelector = (state) => state.atom.endTime;
const snippetSelector = (state) => state.atom.snippet;

export default createSelector(
    [beginTimeSelector, endTimeSelector, snippetSelector],
    (beginTime, endTime, snippet) => {
        const totalTime = endTime - beginTime;
        return totalTime === 0 ? 0 : Math.round(10000 * (snippet.length - 1) / (5 * totalTime))
    }
);