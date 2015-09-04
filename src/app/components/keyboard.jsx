'use strict';

import React from 'react';
import Key from './Key';
import {LETTER, SYMBOL, CONTROL} from './../constants/KeyType';

export default React.createClass({
	mixins: [],
	componentDidMount: componentDidMount,
	getInitialState: getInitialState,
	getDefaultProps: getDefaultProps,
	render: function () {
		let S = this.props.suggestions;

		return <div className="flex-keyboard">
      <div className="container">
        <div className="keyboard">
          <section className="key-row">
						<Key suggestions={S} defaultKey="`" shiftKey="~" size="one" type={SYMBOL} />
						<Key suggestions={S} defaultKey="1" shiftKey="!" size="one" type={SYMBOL} />
						<Key suggestions={S} defaultKey="2" shiftKey="@" size="one" type={SYMBOL} />
						<Key suggestions={S} defaultKey="3" shiftKey="#" size="one" type={SYMBOL} />
						<Key suggestions={S} defaultKey="4" shiftKey="$" size="one" type={SYMBOL} />
						<Key suggestions={S} defaultKey="5" shiftKey="%" size="one" type={SYMBOL} />
						<Key suggestions={S} defaultKey="6" shiftKey="^" size="one" type={SYMBOL} />
						<Key suggestions={S} defaultKey="7" shiftKey="&" size="one" type={SYMBOL} />
						<Key suggestions={S} defaultKey="8" shiftKey="*" size="one" type={SYMBOL} />
						<Key suggestions={S} defaultKey="9" shiftKey="(" size="one" type={SYMBOL} />
						<Key suggestions={S} defaultKey="0" shiftKey=")" size="one" type={SYMBOL} />
						<Key suggestions={S} defaultKey="-" shiftKey="_" size="one" type={SYMBOL} />
						<Key suggestions={S} defaultKey="=" shiftKey="+" size="one" type={SYMBOL} />
						<Key defaultKey="backspace" size="two" type={CONTROL}/>
          </section>
          <section className="key-row">
						<Key defaultKey="tab" size="one-one-half" side="l" type={CONTROL} />
						<Key suggestions={S} defaultKey="q" size="one" type={LETTER} />
						<Key suggestions={S} defaultKey="w" size="one" type={LETTER} />
						<Key suggestions={S} defaultKey="e" size="one" type={LETTER} />
						<Key suggestions={S} defaultKey="r" size="one" type={LETTER} />
						<Key suggestions={S} defaultKey="t" size="one" type={LETTER} />
						<Key suggestions={S} defaultKey="y" size="one" type={LETTER} />
						<Key suggestions={S} defaultKey="u" size="one" type={LETTER} />
						<Key suggestions={S} defaultKey="i" size="one" type={LETTER} />
						<Key suggestions={S} defaultKey="o" size="one" type={LETTER} />
						<Key suggestions={S} defaultKey="p" size="one" type={LETTER} />
						<Key suggestions={S} defaultKey="[" shiftKey="&lbrace;" size="one" type={SYMBOL} />
						<Key suggestions={S} defaultKey="]" shiftKey="&rbrace;" size="one" type={SYMBOL} />
						<Key suggestions={S} defaultKey="\" shiftKey="|" size="one" type={SYMBOL} />
          </section>
          <section className="key-row">
						<Key defaultKey="cap locks" size="one-one-half" side="l" type={CONTROL}/>
						<Key suggestions={S} defaultKey="a" size="one" type={LETTER} />
						<Key suggestions={S} defaultKey="s" size="one" type={LETTER} />
						<Key suggestions={S} defaultKey="d" size="one" type={LETTER} />
						<Key suggestions={S} defaultKey="f" size="one" type={LETTER} />
						<Key suggestions={S} defaultKey="g" size="one" type={LETTER} />
						<Key suggestions={S} defaultKey="h" size="one" type={LETTER} />
						<Key suggestions={S} defaultKey="j" size="one" type={LETTER} />
						<Key suggestions={S} defaultKey="k" size="one" type={LETTER} />
						<Key suggestions={S} defaultKey="l" size="one" type={LETTER} />
						<Key suggestions={S} defaultKey=";" shiftKey=":" size="one" type={SYMBOL} />
						<Key suggestions={S} defaultKey="&quot;" shiftKey="&apos;" size="one" type={SYMBOL} />
						<Key defaultKey="enter" size="two" side="r" type={CONTROL}/>
          </section>
          <section className="key-row">
						<Key defaultKey="shft" size="two-two-half" side="l" type={CONTROL}/>
						<Key suggestions={S} defaultKey="z" size="one" type={LETTER} />
						<Key suggestions={S} defaultKey="x" size="one" type={LETTER} />
						<Key suggestions={S} defaultKey="c" size="one" type={LETTER} />
						<Key suggestions={S} defaultKey="v" size="one" type={LETTER} />
						<Key suggestions={S} defaultKey="b" size="one" type={LETTER} />
						<Key suggestions={S} defaultKey="n" size="one" type={LETTER} />
						<Key suggestions={S} defaultKey="m" size="one" type={LETTER} />
						<Key suggestions={S} defaultKey="," shiftKey="&lt;" size="one" type={SYMBOL} />
						<Key suggestions={S} defaultKey="." shiftKey="&gt;" size="one" type={SYMBOL} />
						<Key suggestions={S} defaultKey="/" shiftKey="?" size="one" type={SYMBOL} />
						<Key defaultKey="shift" size="two-two-half" side="r" type={CONTROL}/>
          </section>
          <section className="key-row">
						<Key defaultKey="ctrl" size="two" side="l" type={CONTROL}/>
						<Key defaultKey="alt" size="two" side="l" type={CONTROL}/>
						<Key defaultKey="" size="five" type={CONTROL}/>
						<Key defaultKey="alt" size="one-one-half" type={CONTROL}/>
						<Key defaultKey="ctrl" size="one" type={CONTROL}/>
						<Key defaultKey="" size="two-two-half arrowkey-container" type={CONTROL}/>
          </section>
        </div>
      </div>
    </div>
	}
});

function componentDidMount() {

}

function getInitialState(){
	return {};
}

function getDefaultProps(){
	return {
		suggestions: []
	}
}
