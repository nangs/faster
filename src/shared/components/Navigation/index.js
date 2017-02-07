import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from './../../state';
import { Toolbar, ToolbarGroup } from './../common/Toolbar';
import { LogoIcon } from './../common/Icons';
import { InfoPopover } from './InfoPopover';

export class _Navigation extends React.Component {
    render() {
        return (
            <header className="navigation">
                <Toolbar className="nav-toolbar">
                    <ToolbarGroup>
                        <span className="logo"><LogoIcon /></span>
                        <InfoPopover {...this.props} />
                    </ToolbarGroup>
                </Toolbar>
            </header>
        );
    }
}

function mapStateToProps(state) {
    return {
        versionNumber: state.atom.versionNumber
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export const Navigation = connect(mapStateToProps, mapDispatchToProps)(_Navigation);