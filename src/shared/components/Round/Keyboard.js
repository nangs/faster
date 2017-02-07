import React, { Component } from 'react';
import { connect } from 'react-redux';
import Key from './Key';
import { LETTER, SYMBOL, CONTROL, SPACEBAR } from './../../constants/KeyType';


const mapStateToProps = (state) => ({
    isShift: state.atom.isShift,
    show: state.atom.settings.showKeyboard
});

@connect(mapStateToProps)
export default class Keyboard extends Component {
    render() {
        const { isShift, show } = this.props;
        const keyboardType = (isShift ? "flex-shift-keyboard": "flex-keyboard");

        const display = {
            display: show? "block" : "none"
        };

        return (
            <div className={keyboardType} style={display}>
                <div className="center">
                    <div className="keyboard">
                        <section className="key-row">
                            <Key defaultKey="`" shiftKey="~" size="one" type={SYMBOL} />
                            <Key defaultKey="1" shiftKey="!" size="one" type={SYMBOL} />
                            <Key defaultKey="2" shiftKey="@" size="one" type={SYMBOL} />
                            <Key defaultKey="3" shiftKey="#" size="one" type={SYMBOL} />
                            <Key defaultKey="4" shiftKey="$" size="one" type={SYMBOL} />
                            <Key defaultKey="5" shiftKey="%" size="one" type={SYMBOL} />
                            <Key defaultKey="6" shiftKey="^" size="one" type={SYMBOL} />
                            <Key defaultKey="7" shiftKey="&" size="one" type={SYMBOL} />
                            <Key defaultKey="8" shiftKey="*" size="one" type={SYMBOL} />
                            <Key defaultKey="9" shiftKey="(" size="one" type={SYMBOL} />
                            <Key defaultKey="0" shiftKey=")" size="one" type={SYMBOL} />
                            <Key defaultKey="-" shiftKey="_" size="one" type={SYMBOL} />
                            <Key defaultKey="=" shiftKey="+" size="one" type={SYMBOL} />
                            <Key defaultKey="backspace" size="two" type={CONTROL}/>
                        </section>
                        <section className="key-row">
                            <Key defaultKey="tab" size="one-one-half" side="l" type={CONTROL} />
                            <Key defaultKey="q" size="one" type={LETTER} />
                            <Key defaultKey="w" size="one" type={LETTER} />
                            <Key defaultKey="e" size="one" type={LETTER} />
                            <Key defaultKey="r" size="one" type={LETTER} />
                            <Key defaultKey="t" size="one" type={LETTER} />
                            <Key defaultKey="y" size="one" type={LETTER} />
                            <Key defaultKey="u" size="one" type={LETTER} />
                            <Key defaultKey="i" size="one" type={LETTER} />
                            <Key defaultKey="o" size="one" type={LETTER} />
                            <Key defaultKey="p" size="one" type={LETTER} />
                            <Key defaultKey="[" shiftKey="&#123;" size="one" type={SYMBOL} />
                            <Key defaultKey="]" shiftKey="&#125;" size="one" type={SYMBOL} />
                            <Key defaultKey="\" shiftKey="|" size="one" type={SYMBOL} />
                        </section>
                        <section className="key-row">
                            <Key defaultKey="cap locks" size="one-one-half" side="l" type={CONTROL}/>
                            <Key defaultKey="a" size="one" type={LETTER} />
                            <Key defaultKey="s" size="one" type={LETTER} />
                            <Key defaultKey="d" size="one" type={LETTER} />
                            <Key defaultKey="f" size="one" type={LETTER} />
                            <Key defaultKey="g" size="one" type={LETTER} />
                            <Key defaultKey="h" size="one" type={LETTER} />
                            <Key defaultKey="j" size="one" type={LETTER} />
                            <Key defaultKey="k" size="one" type={LETTER} />
                            <Key defaultKey="l" size="one" type={LETTER} />
                            <Key defaultKey=";" shiftKey=":" size="one" type={SYMBOL} />
                            <Key defaultKey="&quot;" shiftKey="&apos;" size="one" type={SYMBOL} />
                            <Key defaultKey="enter" size="two" side="r" type={CONTROL}/>
                        </section>
                        <section className="key-row">
                            <Key defaultKey="shft" size="two-two-half" side="l" type={CONTROL}/>
                            <Key defaultKey="z" size="one" type={LETTER} />
                            <Key defaultKey="x" size="one" type={LETTER} />
                            <Key defaultKey="c" size="one" type={LETTER} />
                            <Key defaultKey="v" size="one" type={LETTER} />
                            <Key defaultKey="b" size="one" type={LETTER} />
                            <Key defaultKey="n" size="one" type={LETTER} />
                            <Key defaultKey="m" size="one" type={LETTER} />
                            <Key defaultKey="," shiftKey="&lt;" size="one" type={SYMBOL} />
                            <Key defaultKey="." shiftKey="&gt;" size="one" type={SYMBOL} />
                            <Key defaultKey="/" shiftKey="?" size="one" type={SYMBOL} />
                            <Key defaultKey="shift" size="two-two-half" side="r" type={CONTROL}/>
                        </section>
                        <section className="key-row">
                            <Key defaultKey="ctrl" size="two" side="l" type={CONTROL}/>
                            <Key defaultKey="alt" size="two" side="l" type={CONTROL}/>
                            <Key defaultKey=" " size="five" type={SPACEBAR}/>
                            <Key defaultKey="alt" size="one-one-half" type={CONTROL}/>
                            <Key defaultKey="ctrl" size="one" type={CONTROL}/>
                            <Key defaultKey="" size="two-two-half arrowkey-container" type={CONTROL}/>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}