import { createSelector } from 'reselect';
import indexSelector from './getIndex';

const snippetSelector = state => state.atom.snippet;
const typosSelector = state => state.atom.typos;

export default createSelector(
    [snippetSelector, typosSelector, indexSelector],
    (snippet, typos, index) => snippet
        .split('')
        .map((symbol, i) => ({
            symbol: symbol,
            className: [
                typos[i],
                i === index ? 'active' : 'passive',
                symbol === '\n' ? 'carriage-return' : '',
                symbol === '\t' ? 'tab' : ''
            ].join(' ')
        }))
);