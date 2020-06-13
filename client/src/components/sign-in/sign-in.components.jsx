import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.components';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import { SignInContainer, 
    TitleContainer, 
    ButtonsContainer 
} from './sign-in.styles';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    const [userCredentials, setCredentials] = useState({ email: '', password: '' });
    const { email, password } = userCredentials;
    const HandleSubmit = async event => {
        event.preventDefault();
        emailSignInStart(email, password);
    }

    const HandleChange = event => {
        const {value, name} = event.target;
        setCredentials({ ...userCredentials, [name]: value });
    }

    return(
        <SignInContainer>
            <TitleContainer>I already have an account</TitleContainer>
            <span>Sign in with your email and password.</span>

            <form onSubmit={HandleSubmit}>
                <FormInput 
                    name="email" 
                    type="email" 
                    handleChange={HandleChange} 
                    value={email}
                    label="Email"
                    required 
                />

                <FormInput 
                    name="password" 
                    type="password" 
                    handleChange={HandleChange} 
                    value={password} 
                    label="Password"
                    required 
                />
                <ButtonsContainer>
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton 
                        type="button"
                        onClick={googleSignInStart} 
                        isGoogleSignIn>Sign In with Google</CustomButton>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );

}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn);