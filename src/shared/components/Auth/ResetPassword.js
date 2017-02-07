import React, { Component, PropTypes } from 'react'
import { ValidationIcons } from './ValidationIcons';
import { isValidPassword, passwordsMatch } from './formValidation';

export class ResetPassword extends Component {
    constructor(){
        super();
        this.state = {
            loading:false,
            password: '',
            isPasswordValid: true,
            isPasswordFocused: false,
            passwordConfirm: '',
            isPasswordConfirmValid: true,
            isPasswordConfirmFocused: false
        };
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onPasswordFocus = this.onPasswordFocus.bind(this);
        this.onPasswordBlur = this.onPasswordBlur.bind(this);
        this.onPasswordConfirmChange = this.onPasswordConfirmChange.bind(this);
        this.onPasswordConfirmFocus = this.onPasswordConfirmFocus.bind(this);
        this.onPasswordConfirmBlur = this.onPasswordConfirmBlur.bind(this);
    }

    onPasswordChange(event) {
        const value = event.target.value;
        this.setState({ password: value, isPasswordValid: isValidPassword(value) });
    }

    onPasswordFocus(event) {
        this.setState({ isPasswordFocused: true });
    }

    onPasswordBlur(event) {
        this.setState({ isPasswordFocused: false });
    }

    onPasswordConfirmChange(event) {
        const value = event.target.value;
        this.setState({
            passwordConfirm: value,
            isPasswordConfirmValid: passwordsMatch(this.state.password, value)
        });
    }

    onPasswordConfirmFocus(event) {
        this.setState({ isPasswordConfirmFocused: true });
    }

    onPasswordConfirmBlur(event) {
        this.setState({ isPasswordConfirmFocused: false });
    }

    handleChangePassword = () => {
        const { email, oldPassword, newPassword } = this.state;

        const credentials = { email, oldPassword, newPassword };

        //this.props.firebase.changePassword(credentials);
    };

    render(){
        const isPasswordEmpty = this.state.password ? 'input_hasValue' : 'input_empty';
        const isPasswordValid = this.state.isPasswordValid ? 'input_valid' : 'input_invalid';
        const isPasswordError = this.state.isPasswordValid ? '' : 'input_error';
        const isPasswordFocused = this.state.isPasswordFocused ? 'input_focused' : 'input_unfocused';
        const passwordClassNames = `input_group ${isPasswordEmpty} ${isPasswordError} ${isPasswordValid} ${isPasswordFocused}`;
        const passwordErrorClassNames = `error_container ${this.state.isPasswordValid ? 'invisible' : 'visible'}`;


        const isPasswordConfirmEmpty = this.state.passwordConfirm ? 'input_hasValue' : 'input_empty';
        const isPasswordConfirmValid = this.state.isPasswordConfirmValid ? 'input_valid' : 'input_invalid';
        const isPasswordConfirmError = this.state.isPasswordConfirmValid ? '' : 'input_error';
        const isPasswordConfirmFocused = this.state.isPasswordConfirmFocused ? 'input_focused' : 'input_unfocused';
        const passwordConfirmClassNames = `input_group ${isPasswordConfirmEmpty} ${isPasswordConfirmError} ${isPasswordConfirmValid} ${isPasswordConfirmFocused}`;
        const passwordConfirmErrorClassNames = `error_container ${this.state.isPasswordConfirmValid ? 'invisible' : 'visible'}`;

        return(
            <div className="form">
                <div className={passwordClassNames}>
                    <label className="input_label" htmlFor="password">
                        <span className="label_text">Password</span>
                    </label>
                    <input type="password"
                           className="input"
                           id="password"onChange={this.onPasswordChange}
                           onChange={this.onPasswordChange}
                           onFocus={this.onPasswordFocus}
                           onBlur={this.onPasswordBlur}
                    />
                    <div className={passwordErrorClassNames}><span>Try a stronger password.</span></div>
                    <ValidationIcons />
                </div>

                <div className={passwordConfirmClassNames}>
                    <label className="input_label" htmlFor="passwordConfirm">
                        <span className="label_text">Confirm Password</span>
                    </label>
                    <input type="password"
                           className="input"
                           id="passwordConfirm"
                           onChange={this.onPasswordConfirmChange}
                           onChange={this.onPasswordConfirmChange}
                           onFocus={this.onPasswordConfirmFocus}
                           onBlur={this.onPasswordConfirmBlur}
                    />
                    <div className={passwordConfirmErrorClassNames}><span>Passwords must match.</span></div>
                    <ValidationIcons />
                </div>

                <button className="button button_wide" onClick={this.handleChangePassword}>Change Password</button>
            </div>
        )
    }
}