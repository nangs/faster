import { createSelector } from 'reselect';
import indexSelector from './getIndex';

const hasStartedSelector = state => state.atom.hasStarted;

export default createSelector(
    [hasStartedSelector, indexSelector],
    (hasStarted, index) => hasStarted && index === -1
);