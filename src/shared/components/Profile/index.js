import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ResetPassword } from './../Auth';
import { CheckMarkIcon } from './../common/Icons';


const mapStateToProps = (state) => ({
    user: state.atom.user
});

@connect(mapStateToProps)
export class Profile extends Component {
    render(){
        const { name, avatar, verified } = this.props.user;

        return(
            <div className="profile">
                <div className="avatar">
                    <img src={avatar} alt="" />
                    <div className="member">
                        <div>{name}</div>
                        <div>
                            {verified ? <CheckMarkIcon /> : ''}
                            <span>Email {verified ? '' : 'not'} Verified</span>
                        </div>
                    </div>
                </div>
                <ResetPassword />
            </div>
        )
    }
}