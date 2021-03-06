import React, { useEffect, lazy, Suspense } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions';

import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.components';
import ErrorBoundry from './components/error-boundary/error-boundary.components';

import { GlobalStyles } from './global.styles';

const HomePage = lazy( () => import('./pages/homepage/homepage.component') );
const ShopPage = lazy( () => import('./pages/shop/shop.component') );
const SignInAndSignUpPage = lazy( () => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component') );
const CheckoutPage = lazy( () => import('./components/checkout/checkout.component') );

const App = ({ checkUserSession, currentUser }) => {
	useEffect(() => {
		checkUserSession();
	}, [checkUserSession]);
	
	return (
		<div>
			<GlobalStyles/>
			<Header />
			<Switch>
				<ErrorBoundry>
					<Suspense fallback={<Spinner />}>
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
					</Suspense>
				</ErrorBoundry>
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
