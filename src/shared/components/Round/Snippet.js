import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Selectors } from './../../state';

const mapStateToProps = (state) => ({
    snippet: Selectors.getFormattedSnippet(state),
    typos: state.atom.typos
});

@connect(mapStateToProps)
export default class Snippet extends Component {
    render() {
        const snippet = this.props.snippet.map((character, i) => (
            <span key={i} className={character.className}>{character.symbol}</span>
        ));
        return (
            <div className="snippet">
                <pre className="center">{snippet}</pre>
            </div>
        )
    }
}