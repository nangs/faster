import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    snippet: state.atom.snippet,
    typos: state.atom.typos
});

@connect(mapStateToProps)
export default class Snippet extends Component {
    render() {
        const { snippet, typos } = this.props;
        const snippetMarkup = snippet
            .split('')
            .map((character, index) => (
                <span key={index} className={typos[index]}>{character}</span>
            ));
        return (
            <div className="snippet">
                <pre className="center">{snippetMarkup}</pre>
            </div>
        )
    }
}