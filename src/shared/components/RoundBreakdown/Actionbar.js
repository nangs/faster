import React from 'react';
import { connect } from 'react-redux';
import { Toolbar, ToolbarGroup } from './../common/Toolbar';
import { LogoIcon } from './../common/Icons';
import { InfoPopover } from './InfoPopover';


@connect(() => ({}))
export class Actionbar extends React.Component {
    render() {
        return (
            <header className="breakdown-actionbar">
                <Toolbar className="nav-toolbar">
                    <ToolbarGroup>
                        <span className="logo">Results</span>
                        <InfoPopover {...this.props} />
                    </ToolbarGroup>
                </Toolbar>
            </header>
        );
    }
}