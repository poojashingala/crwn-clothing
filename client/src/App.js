import React, { useEffect } from 'react';

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

import { GlobalStyles } from './global.styles';

const App = ({ checkUserSession, currentUser }) => {
	useEffect(() => {
		checkUserSession();
	}, [checkUserSession]);
	
	return (
		<div>
			<GlobalStyles/>
			<Header />
			<Switch>
				<Route exact path='/' component={HomePage}></Route>
				<Route path='/shop' component={ShopPage}></Route>
				<Route exact path='/checkout' component={CheckoutPage}></Route>
				<Route exact 
					path='/signin' 
					render={ () => 
						currentUser ? 
							( <Redirect to="/" /> ) : 
							( <SignInAndSignUpPage /> ) 
					}>
				</Route>
			</Switch>    
		</div>
		
	);
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
	checkUserSession: () => dispatch(checkUserSession())
})

export default connect( mapStateToProps, mapDispatchToProps )(App);
