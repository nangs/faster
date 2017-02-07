import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from './../../../state';
import { MemberAvatar } from './../Avatar';
import { CheckMarkIcon } from './../Icons';

@connect(() => ({}), (dispatch) => bindActionCreators(Actions, dispatch))
export class Drawer extends Component {
    render () {
        const { user, logout } = this.props;
        const { name } = user;
        const emailVerified = false;
        return (
            <section>
                <header><h2>Menu</h2></header>
                <div className="member">
                    <MemberAvatar />
                    <p>
                        {emailVerified ? <CheckMarkIcon /> : ''}
                        {name}
                    </p>
                </div>
                <div>
                    <button className="button logout" onClick={logout}>Logout</button>
                </div>
            </section>
        );
    }
}