import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Selectors } from './../../state';
import { SYMBOL, SPACEBAR } from './../../constants/KeyType';


const mapStateToProps = (state) => ({
    suggestedKeys: Selectors.getSuggestions(state).suggestedKeys
});

@connect(mapStateToProps)
export default class Key extends Component {
    render() {
        const {
            suggestedKeys,
            defaultKey,
            shiftKey,
            size,
            type,
            side
        } = this.props;

        const isSpacebar = (type === SPACEBAR && suggestedKeys[0] === " ");
        const isSuggested = [defaultKey, shiftKey].some(value => suggestedKeys.includes(value));
        const suggest = (isSpacebar || isSuggested) ? "suggest" : "";

        const parent = ["key", size, type, side, suggest].join(" ");

        let off = defaultKey;
        let on;
        if(type === SYMBOL){
            off = <span className="off">{defaultKey}</span>;
            on = <span className="on">{shiftKey}</span>;
        }
        
        return (
            <div className={parent}>
                {off}{on}
            </div>
        )
    }
}