import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions, Selectors } from './../../state';
import { LANGUAGES } from './../../constants/Languages';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatcher) => bindActionCreators(Actions, dispatcher);

@connect(mapStateToProps, mapDispatchToProps)
export class LanguageSelection extends Component {
    constructor(props, context) {
        super(props, context);
    }

    selectLanguage(lang) {
        this.props.setLanguage(lang);
    }
    
    render() {
        
        const languages = LANGUAGES.map((lang, i) => (
            <div key={i} className="lang-block-wrappers">
                <div className="lang-block" onClick={this.selectLanguage.bind(this, lang)}>{lang}</div>
            </div>
        ));
        
        return (
            <div>
                <div id="choose-lang-label">Choose a language</div>
                <div id="language-selection">
                    {languages}
                </div>
            </div>
        )
    }
}