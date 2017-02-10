import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Toolbar, ToolbarGroup } from './../common/Toolbar';
import { HistoryIcon } from './../common/Icons';
import { LanguageLookup } from './LanguageLookup';
import { Actions } from './../../state';

@connect(() => ({}), dispatch => bindActionCreators(Actions, dispatch))
export class Actionbar extends React.Component {
    render() {
        return (
            <header className="breakdown-actionbar">
                <Toolbar className="nav-toolbar">
                    <ToolbarGroup>
                        <HistoryIcon />
                        <span>History</span>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <div className="language-lookup">
                            <LanguageLookup {...this.props} />
                        </div>
                    </ToolbarGroup>
                </Toolbar>
            </header>
        );
    }
}