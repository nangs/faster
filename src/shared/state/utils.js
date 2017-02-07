import { UNVISITED } from './../constants/SnippetStates';

export const getIndex = (typos) => {
    const index = typos.findIndex(character => character === UNVISITED);
    return index < 0 ? 0 : index;
};