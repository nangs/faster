import { createSelector } from 'reselect';

const practiceHistorySelector = state => state.atom.practiceHistory;
const languageFilterSelector = state => state.atom.languageFilter;

const matchesFilter = (filter, value) => (
    filter.text === ''
    || (
        value.language //bc of bad data
        && value.language.toLowerCase() === filter.text.toLowerCase()
    )
);

const filteredHistory = createSelector(
    [practiceHistorySelector, languageFilterSelector],
    (history, filter) => history.filter(round => matchesFilter(filter, round)).reverse()
);

export default createSelector(
    [filteredHistory],
    (history) => history.map(round => Object.assign({}, round, {
        formattedTimeStamp: new Date(parseInt(round.timestamp))
            .toISOString()
            .split('T')[0]
            .toString()
    }))
);