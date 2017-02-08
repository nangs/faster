import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Selectors } from './../state';
import { Round } from './../components/Round';
import { RoundBreakdown } from './../components/RoundBreakdown';
import { LanguageSelection } from './../components/LanguageSelection'

const mapStateToProps = (state) => ({
    language: state.atom.language,
    isRoundOver: Selectors.isRoundOver(state)
});

@connect(mapStateToProps)
export class Practice extends Component {
    render() {
        if(this.props.isRoundOver) {
            return <RoundBreakdown />
        } else if(!this.props.language) {
            return <LanguageSelection />
        } else {
            return <Round />
        }
    }
}