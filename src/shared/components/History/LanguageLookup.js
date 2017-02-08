import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions, Selectors } from './../../state';
import { Lookup } from './../common/Lookup';
import { LANGUAGES } from './../../constants/Languages';


const mapStateToProps = (state) => ({
    selectedLanguage: state.atom.languageFilter.text
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export class LanguageLookup extends Component {
    constructor(props, context) {
        super(props, context);
        this.search = this.search.bind(this);
        this.select = this.select.bind(this);
        this.deSelect = this.deSelect.bind(this);
        this.state = {
            lookupResults: []
        }
    }

    search(query){
        const filteredLanguages = LANGUAGES
            .filter(lang => lang.toLowerCase().includes(query))
            .map(lang => ({
                text: lang
            }));
        
        this.setState({ lookupResults: filteredLanguages });
    };

    select(result) {
        this.props.selectLanguageFilter(result);
    };

    deSelect() {
        this.props.selectLanguageFilter({
            text: ''
        });
    };

    render() {
        const { lookupResults } = this.state;
        const { selectedLanguage } = this.props;
        return (
            <Lookup {...this.props}
                classNames={'language-lookup'}
                resultClassNameField={""}
                selected={selectedLanguage}
                deSelect={this.deSelect}
                placeholder="Filter by Language"
                width={252}
                results={lookupResults}
                select={this.select}
                onChange={this.search}
                inputStyles={{
                    border: 'none'
                }}
                listStyles={{
                    position: 'absolute',
                    right: '0px',
                    zIndex: 99999,
                    backgroundColor: 'white'
                }}
            />
        );
    }
}