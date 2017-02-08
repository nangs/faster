import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from './../../../state';
import { MemberAvatar } from './../Avatar';
import { CheckMarkIcon } from './../Icons';
import { push } from 'react-router-redux';

@connect(() => ({}), (dispatch) => bindActionCreators({ ...Actions, push }, dispatch))
export class Drawer extends Component {
    constructor(props, context) {
        super(props, context);
        this.viewHistory = this.viewHistory.bind(this);
        this.viewPractice = this.viewPractice.bind(this);
    }

    viewHistory() {
        this.props.push('/history');
        this.props.closeDrawer();
    }

    viewPractice() {
        this.props.push('/round');
        this.props.closeDrawer();
    }


    render () {
        const { user, logout } = this.props;
        const { name, avatar, verified } = user;
        const emailVerified = verified;
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
                        <li onClick={this.viewPractice}><span>Practice</span></li>
                        <li onClick={this.viewHistory}><span>History</span></li>
                        <li onClick={logout}><span>Logout</span></li>
                    </ul>
                </section>
            </div>
        );
    }
}

Drawer.defaultProps = {
    user: {
        name: 'Signup'
    }
};