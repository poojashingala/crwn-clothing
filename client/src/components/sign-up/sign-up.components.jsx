import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.components';
import CustomButton from '../custom-button/custom-button.component';
import { signUpStart } from '../../redux/user/user.actions';


import { SignUpContainer, TitleContainer } from './sign-up.styles';

const SignUp = ({ signUpStart }) => {
    const [userCredentials, setCredentials] = useState({ displayName: '', email: '', password: '', confirmPassword: '' });
    const { displayName, email, password, confirmPassword } = userCredentials;
    const handleSubmit = async event => {
        event.preventDefault();
        if( password !== confirmPassword ){
            alert("Passwords don't match");
            return;
        }
        signUpStart(email, password, displayName);
    }

    const handleChange = event => {
        const {name, value} = event.target;
        setCredentials({ ...userCredentials, [name]: value });
    }

    return(
        <SignUpContainer>
            <TitleContainer>I do not have an account</TitleContainer>
            <span>Sign up with your email and password.</span>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput
                    type="text" 
                    name="displayName" 
                    value={displayName} 
                    onChange={handleChange} 
                    label="Display Name" 
                    required 
                />
                <FormInput
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    label="Email"
                    required
                />
                <FormInput
                    type="password"
                    name="password"
                    value={password}
                    label="Password"
                    onChange={handleChange}
                    required
                />
                <FormInput
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    label="Confirm Password"
                    onChange={handleChange}
                    required
                />
                <CustomButton type="submit">Sign Up</CustomButton>
            </form>
        </SignUpContainer>
    );

}

const mapDispatchToProps = dispatch => ({
    signUpStart: (email, password, displayName) => dispatch(signUpStart({ email, password, displayName }))
})

export default connect(null, mapDispatchToProps)(SignUp);