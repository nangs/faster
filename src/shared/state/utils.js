import { UNVISITED } from './../constants/SnippetStates';

export const getIndex = (typos) => typos.findIndex(character => character === UNVISITED);