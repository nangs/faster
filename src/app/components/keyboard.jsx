'use strict';

import React from 'react';

export default React.createClass({
	mixins: [],
	componentDidMount: componentDidMount,
	getInitialState: function(){
		return {

		}
	},
	render: function () {
		return <div className="flex-keyboard">
      <div className="container">
        <div className="keyboard">
          <section className="key-row">
            <div className="key one symbol"><span className="off">`</span><span className="on">~</span></div>
            <div className="key one symbol"><span className="off">1</span><span className="on">!</span></div>
            <div className="key one symbol"><span className="off">2</span><span className="on">@</span></div>
            <div className="key one symbol"><span className="off">3</span><span className="on">#</span></div>
            <div className="key one symbol"><span className="off">4</span><span className="on">$</span></div>
            <div className="key one symbol"><span className="off">5</span><span className="on">%</span></div>
            <div className="key one symbol"><span className="off">6</span><span className="on">^</span></div>
            <div className="key one symbol"><span className="off">7</span><span className="on">&</span></div>
            <div className="key one symbol"><span className="off">8</span><span className="on">*</span></div>
            <div className="key one symbol"><span className="off">9</span><span className="on">(</span></div>
            <div className="key one symbol"><span className="off">0</span><span className="on">)</span></div>
            <div className="key one symbol"><span className="off">-</span><span className="on">_</span></div>
            <div className="key one symbol"><span className="off">=</span><span className="on">+</span></div>
            <div className="key two">backspace</div>
          </section>
          <section className="key-row">
            <div className="key one-one-half l">tab</div>
            <div className="key one letter">q</div>
            <div className="key one letter">w</div>
            <div className="key one letter">e</div>
            <div className="key one letter">r</div>
            <div className="key one letter">t</div>
            <div className="key one letter">y</div>
            <div className="key one letter">u</div>
            <div className="key one letter">i</div>
            <div className="key one letter">o</div>
            <div className="key one letter">p</div>
            <div className="key one symbol"><span className="off">[</span><span className="on">&lbrace;</span></div>
            <div className="key one symbol"><span className="off">]</span><span className="on">&rbrace;</span></div>
            <div className="key one symbol"><span className="off">\</span><span className="on">|</span></div>
          </section>
          <section className="key-row">
            <div className="key one-one-half l">cap locks</div>
            <div className="key one letter">a</div>
            <div className="key one letter">s</div>
            <div className="key one letter">d</div>
            <div className="key one letter">f</div>
            <div className="key one letter">g</div>
            <div className="key one letter">h</div>
            <div className="key one letter">j</div>
            <div className="key one letter">k</div>
            <div className="key one letter">l</div>
            <div className="key one symbol"><span className="off">;</span><span className="on">:</span></div>
            <div className="key one symbol"><span className="off">&quot;</span><span className="on">&apos;</span></div>
            <div className="key two r">enter</div>
          </section>
          <section className="key-row">
            <div className="key two-two-half l">shift</div>
            <div className="key one letter">z</div>
            <div className="key one letter">x</div>
            <div className="key one letter">c</div>
            <div className="key one letter">v</div>
            <div className="key one letter">b</div>
            <div className="key one letter">n</div>
            <div className="key one letter">m</div>
            <div className="key one symbol"><span className="off">,</span><span className="on">&lt;</span></div>
            <div className="key one symbol"><span className="off">.</span><span className="on">&gt;</span></div>
            <div className="key one symbol"><span className="off">/</span><span className="on">?</span></div>
            <div className="key two-two-half r">shift</div>
          </section>
          <section className="key-row">
            <div className="key two l">ctrl</div>
            <div className="key two l">alt</div>
            <div className="key five"></div>
            <div className="key one-one-half">alt</div>
            <div className="key one">ctrl</div>
            <div className="arrowkey-container two-two-half"></div>
          </section>
        </div>
      </div>
    </div>
	}
});

function componentDidMount() {

}
