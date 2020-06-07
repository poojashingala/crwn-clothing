import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.components';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

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
        const { emailSignInStart } = this.props;
        const { email, password } = this.state;
        emailSignInStart(email, password);
    }

    HandleChange = event => {
        const {value, name} = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const {googleSignInStart} = this.props
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
                        <CustomButton 
                            type="button"
                            onClick={googleSignInStart} 
                            isGoogleSignIn>Sign In with Google</CustomButton>
                    </ButtonsContainer>
                </form>
            </SignInContainer>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn);