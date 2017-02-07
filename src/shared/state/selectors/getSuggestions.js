import { createSelector } from 'reselect';
import Fingers from './../../constants/Fingers';

const snippetSelector = state => state.atom.snippet;
const indexSelector = state => state.atom.index;

const characterSelector = createSelector(
    [snippetSelector, indexSelector],
    (snippet, index) => snippet[index]
);

export default createSelector(
    [characterSelector],
    (character) => {
        const charType = character.charCodeAt(0);
        if(charType === 10)
            return { suggestedKeys: ["enter"], suggestedFinger: 'rpinky' };
        if(charType === 9)
            return { suggestedKeys: ["tab"], suggestedFinger: 'lpinky' };

        for(var finger in Fingers) {
            if(Fingers[finger].includes(character.toLowerCase()))
                return { suggestedKeys: Fingers[finger], suggestedFinger: finger };
        }
        return { suggestedKeys: [], suggestedFinger: 'lpinky' };
    }
);