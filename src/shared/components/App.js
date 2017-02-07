const Menu = require('react-burger-menu').push;
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from './../state';
import { Drawer } from './common/Drawer';
import { Round } from './Round';
import { Login, RequestPasswordReset, ResetPassword, SignUp } from './Auth';

const mapStateToProps = (state) => ({
    auth: state.atom.auth,
    user: state.atom.user
});

const mapDispatchToProps = (dispatcher) => bindActionCreators(Actions, dispatcher);

class App extends Component {
    render(){
        const { auth } = this.props;
        if(auth === undefined) {
            return <Loading />
        }
        else if(!auth) {
            return <Authenticate />
        }
        else {
            return <Authenticated {...this.props} />
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

class Loading extends Component {
    render() {
        return (
            <div>loading</div>
        )
    }
}

class Authenticate extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {currentForm: 'Login'}
    }

    changeForm = (formName) => {
        this.setState({currentForm: formName});
    };

    render() {
        const map = {
            Login: <Login changeForm={this.changeForm} />,
            RequestPasswordReset: <RequestPasswordReset changeForm={this.changeForm} />,
            ResetPassword: <ResetPassword changeForm={this.changeForm} />,
            SignUp: <SignUp changeForm={this.changeForm} />
        };

        const currentForm = map[this.state.currentForm];

        return currentForm;
    }
}

class Authenticated extends Component {
    render () {
        return (
            <div id="page-wrapper-id">
                <Menu pageWrapId="page-id" outerContainerId="page-wrapper-id" right={true}>
                    <Drawer {...this.props} />
                </Menu>
                <div id="page-id">
                    <Round />
                </div>
            </div>
        );
    }
}