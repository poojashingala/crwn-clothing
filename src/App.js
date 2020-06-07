import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions';
//import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import CheckoutPage from './components/checkout/checkout.component';

import './App.css';

class App extends React.Component {

	unsubscribeFromAuth = null;
	componentDidMount(){
		const { checkUserSession } = this.props;
		checkUserSession();
	}

	componentWillUnmount(){
		this.unsubscribeFromAuth();
	}

	render(){
		return (
			<div>
				<Header />
				<Switch>
					<Route exact path='/' component={HomePage}></Route>
					<Route path='/shop' component={ShopPage}></Route>
					<Route exact path='/checkout' component={CheckoutPage}></Route>
					<Route exact 
						path='/signin' 
						render={ () => 
							this.props.currentUser ? 
								( <Redirect to="/" /> ) : 
								( <SignInAndSignUpPage /> ) 
						}>
					</Route>
				</Switch>    
			</div>
			
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
	checkUserSession: () => dispatch(checkUserSession())
})

export default connect( mapStateToProps, mapDispatchToProps )(App);
