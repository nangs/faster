import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Toolbar, ToolbarGroup } from './../common/Toolbar';
import { Actions } from './../../state';

@connect(() => ({}), dispatch => bindActionCreators(Actions, dispatch))
export class Actionbar extends React.Component {
    render() {
        return (
            <header className="breakdown-actionbar">
                <Toolbar className="nav-toolbar">
                    <ToolbarGroup>
                        <span>History</span>
                    </ToolbarGroup>
                </Toolbar>
            </header>
        );
    }
}