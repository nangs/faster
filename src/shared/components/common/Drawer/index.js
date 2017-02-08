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
            <div id="inner-drawer">
                <section id="my-info">
                    <header><h2>Faster</h2></header>
                    <div className="member">
                        {/*<MemberAvatar />*/}
                        <p>
                            {emailVerified ? <CheckMarkIcon /> : ''}
                            {name}
                        </p>
                    </div>
                </section>
                <section id="menu">
                    <ul>
                        <li><span>Account</span></li>
                        <li><span>History</span></li>
                        <li onClick={logout}><span>Logout</span></li>
                    </ul>
                </section>
            </div>
        );
    }
}