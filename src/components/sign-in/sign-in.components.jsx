import React from 'react';
import FormInput from '../form-input/form-input.components';
import CustomButton from '../custom-button/custom-button.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import { SignInContainer, 
    TitleContainer, 
    ButtonsContainer 
} from './sign-in.styles';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    HandleSubmit = async event => {
        event.preventDefault();

        const { email, password } = this.state;

        try{
            await auth.signInWithEmailAndPassword( email, password );
            this.setState({ email: '', password: '' });
        } catch( error ) {
            console.log("error in signing in user.", error.message);
        }
    }

    HandleChange = event => {
        const {value, name} = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return(
            <SignInContainer>
                <TitleContainer>I already have an account</TitleContainer>
                <span>Sign in with your email and password.</span>

                <form onSubmit={this.HandleSubmit}>
                    <FormInput 
                        name="email" 
                        type="email" 
                        handleChange={this.HandleChange} 
                        value={this.state.email}
                        label="Email"
                        required 
                    />

                    <FormInput 
                        name="password" 
                        type="password" 
                        handleChange={this.HandleChange} 
                        value={this.state.password} 
                        label="Password"
                        required 
                    />
                    <ButtonsContainer>
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In with Google</CustomButton>
                    </ButtonsContainer>
                    
                </form>
            </SignInContainer>
        );
    }
}

export default SignIn;