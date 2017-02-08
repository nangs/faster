import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Toolbar, ToolbarGroup, ToolbarSpacer } from './../common/Toolbar';
import { LogoIcon } from './../common/Icons';
import { Button } from './../common/Buttons';
import { InfoPopover } from './InfoPopover';
import { Actions } from './../../state';

@connect(() => ({}), dispatch => bindActionCreators(Actions, dispatch))
export class Actionbar extends React.Component {
    render() {
        return (
            <header className="breakdown-actionbar">
                <Toolbar className="nav-toolbar">
                    <ToolbarGroup>
                        <span className="logo">Results</span>
                        <InfoPopover {...this.props} />
                    </ToolbarGroup>
                    <ToolbarSpacer />
                    <ToolbarGroup>
                        <Button text="Next Game" onClick={this.props.beginNewRound} />
                        <div> </div>
                    </ToolbarGroup>
                </Toolbar>
            </header>
        );
    }
}