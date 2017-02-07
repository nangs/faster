import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from './../../state';
import Statistics from './Statistics';
import Snippet from './Snippet';
import Hands from './Hands';
import Keyboard from './Keyboard';
import KeyCode from './../../constants/KeyCode';

const mapStateToProps = (state) => ({
    hasStarted: state.atom.hasStarted,
    snippet: state.atom.snippet,
    isShift: state.atom.isShift,
    typos: state.atom.typos,
    suggestedKeys: state.atom.suggestedKeys,
    suggestedFingers: state.atom.suggestedFingers
});

const mapDispatchToProps = (dispatcher) => bindActionCreators(Actions, dispatcher);

@connect(mapStateToProps, mapDispatchToProps)
export class Round extends Component {
    constructor(props, context) {
        super(props, context);
        this.keyDownListener = this.keyDownListener.bind(this);
    }
    
    componentDidMount() {
        document.addEventListener('keydown', this.keyDownListener);
    }
    
    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDownListener);
    }

    keyDownListener (event) {
        const { keyCode, shiftKey } = event;
        if([KeyCode.BackSpace, KeyCode.Space, KeyCode.Tab].includes(keyCode)) {
            event.preventDefault();
        }
        this.props.handleKeypress(keyCode, shiftKey);
    }
    
    render() {
        return (
            <div id="game">
                <Statistics />
                <Snippet />
                <Keyboard />
                <Hands />
            </div>
        )
    }
}