import React, { Component } from 'react';
import { connect } from 'react-redux';
import Key from './Key';
import { LETTER, SYMBOL, CONTROL, SPACEBAR } from './../../constants/KeyType';


const mapStateToProps = (state) => ({
    isShift: state.atom.isShift,
    suggestedKeys: state.atom.suggestedKeys,
    show: state.atom.settings.showKeyboard
});

@connect(mapStateToProps)
export default class Keyboard extends Component {
    render() {
        const { suggestedKeys, isShift, show } = this.props;

        const S = suggestedKeys;
        const keyboardType = (isShift ? "flex-shift-keyboard": "flex-keyboard");

        const display = {
            display: show? "block" : "none"
        };

        return (
            <div className={keyboardType} style={display}>
                <div className="center">
                    <div className="keyboard">
                        <section className="key-row">
                            <Key suggestedKeys={S} defaultKey="`" shiftKey="~" size="one" type={SYMBOL} />
                            <Key suggestedKeys={S} defaultKey="1" shiftKey="!" size="one" type={SYMBOL} />
                            <Key suggestedKeys={S} defaultKey="2" shiftKey="@" size="one" type={SYMBOL} />
                            <Key suggestedKeys={S} defaultKey="3" shiftKey="#" size="one" type={SYMBOL} />
                            <Key suggestedKeys={S} defaultKey="4" shiftKey="$" size="one" type={SYMBOL} />
                            <Key suggestedKeys={S} defaultKey="5" shiftKey="%" size="one" type={SYMBOL} />
                            <Key suggestedKeys={S} defaultKey="6" shiftKey="^" size="one" type={SYMBOL} />
                            <Key suggestedKeys={S} defaultKey="7" shiftKey="&" size="one" type={SYMBOL} />
                            <Key suggestedKeys={S} defaultKey="8" shiftKey="*" size="one" type={SYMBOL} />
                            <Key suggestedKeys={S} defaultKey="9" shiftKey="(" size="one" type={SYMBOL} />
                            <Key suggestedKeys={S} defaultKey="0" shiftKey=")" size="one" type={SYMBOL} />
                            <Key suggestedKeys={S} defaultKey="-" shiftKey="_" size="one" type={SYMBOL} />
                            <Key suggestedKeys={S} defaultKey="=" shiftKey="+" size="one" type={SYMBOL} />
                            <Key defaultKey="backspace" size="two" type={CONTROL}/>
                        </section>
                        <section className="key-row">
                            <Key suggestedKeys={S} defaultKey="tab" size="one-one-half" side="l" type={CONTROL} />
                            <Key suggestedKeys={S} defaultKey="q" size="one" type={LETTER} />
                            <Key suggestedKeys={S} defaultKey="w" size="one" type={LETTER} />
                            <Key suggestedKeys={S} defaultKey="e" size="one" type={LETTER} />
                            <Key suggestedKeys={S} defaultKey="r" size="one" type={LETTER} />
                            <Key suggestedKeys={S} defaultKey="t" size="one" type={LETTER} />
                            <Key suggestedKeys={S} defaultKey="y" size="one" type={LETTER} />
                            <Key suggestedKeys={S} defaultKey="u" size="one" type={LETTER} />
                            <Key suggestedKeys={S} defaultKey="i" size="one" type={LETTER} />
                            <Key suggestedKeys={S} defaultKey="o" size="one" type={LETTER} />
                            <Key suggestedKeys={S} defaultKey="p" size="one" type={LETTER} />
                            <Key suggestedKeys={S} defaultKey="[" shiftKey="&#123;" size="one" type={SYMBOL} />
                            <Key suggestedKeys={S} defaultKey="]" shiftKey="&#125;" size="one" type={SYMBOL} />
                            <Key suggestedKeys={S} defaultKey="\" shiftKey="|" size="one" type={SYMBOL} />
                        </section>
                        <section className="key-row">
                            <Key defaultKey="cap locks" size="one-one-half" side="l" type={CONTROL}/>
                            <Key suggestedKeys={S} defaultKey="a" size="one" type={LETTER} />
                            <Key suggestedKeys={S} defaultKey="s" size="one" type={LETTER} />
                            <Key suggestedKeys={S} defaultKey="d" size="one" type={LETTER} />
                            <Key suggestedKeys={S} defaultKey="f" size="one" type={LETTER} />
                            <Key suggestedKeys={S} defaultKey="g" size="one" type={LETTER} />
                            <Key suggestedKeys={S} defaultKey="h" size="one" type={LETTER} />
                            <Key suggestedKeys={S} defaultKey="j" size="one" type={LETTER} />
                            <Key suggestedKeys={S} defaultKey="k" size="one" type={LETTER} />
                            <Key suggestedKeys={S} defaultKey="l" size="one" type={LETTER} />
                            <Key suggestedKeys={S} defaultKey=";" shiftKey=":" size="one" type={SYMBOL} />
                            <Key suggestedKeys={S} defaultKey="&quot;" shiftKey="&apos;" size="one" type={SYMBOL} />
                            <Key suggestedKeys={S} defaultKey="enter" size="two" side="r" type={CONTROL}/>
                        </section>
                        <section className="key-row">
                            <Key defaultKey="shft" size="two-two-half" side="l" type={CONTROL}/>
                            <Key suggestedKeys={S} defaultKey="z" size="one" type={LETTER} />
                            <Key suggestedKeys={S} defaultKey="x" size="one" type={LETTER} />
                            <Key suggestedKeys={S} defaultKey="c" size="one" type={LETTER} />
                            <Key suggestedKeys={S} defaultKey="v" size="one" type={LETTER} />
                            <Key suggestedKeys={S} defaultKey="b" size="one" type={LETTER} />
                            <Key suggestedKeys={S} defaultKey="n" size="one" type={LETTER} />
                            <Key suggestedKeys={S} defaultKey="m" size="one" type={LETTER} />
                            <Key suggestedKeys={S} defaultKey="," shiftKey="&lt;" size="one" type={SYMBOL} />
                            <Key suggestedKeys={S} defaultKey="." shiftKey="&gt;" size="one" type={SYMBOL} />
                            <Key suggestedKeys={S} defaultKey="/" shiftKey="?" size="one" type={SYMBOL} />
                            <Key defaultKey="shift" size="two-two-half" side="r" type={CONTROL}/>
                        </section>
                        <section className="key-row">
                            <Key defaultKey="ctrl" size="two" side="l" type={CONTROL}/>
                            <Key defaultKey="alt" size="two" side="l" type={CONTROL}/>
                            <Key suggestedKeys={S} defaultKey=" " size="five" type={SPACEBAR}/>
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