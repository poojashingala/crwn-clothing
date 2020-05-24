import React from 'react';
import SignIn from '../../components/sign-in/sign-in.components';
import SignUp from '../../components/sign-up/sign-up.components';

import { SignInSignUpContainer } from './sign-in-sign-up.styles';

const SignInAndSignUpPage = () => (
    <SignInSignUpContainer>
        <SignIn />
        <SignUp />
    </SignInSignUpContainer>
);

export default SignInAndSignUpPage;