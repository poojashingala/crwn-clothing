import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';

import CheckoutItem from '../checkout-item/checkout-item.component';

import { 
    CheckoutPageContainer,
    CheckoutHeaderContainer,
    HeaderBlockContainer,
    TotalStyles,
    TestWarningContainer,
 } from './checkout.styles'; 

const CheckoutPage = ({ cartItems, cartTotal }) => (
    <CheckoutPageContainer>
        <CheckoutHeaderContainer>
            <HeaderBlockContainer>
                <span>Product</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Description</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Quantity</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Price</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Remove</span>
            </HeaderBlockContainer>
        </CheckoutHeaderContainer>
        { cartItems.map( cartItem => (
            <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ) ) }
        <TotalStyles>TOTAL: ${cartTotal}</TotalStyles>
        <TestWarningContainer>
            *Please use the following credit card for payments*
            <br />
            4242 4242 4242 4242 - Exp: 10/20 - CVV: 123
        </TestWarningContainer>
        <StripeCheckoutButton price={cartTotal} />
    </CheckoutPageContainer>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartTotal: selectCartTotal
})

export default connect(mapStateToProps)(CheckoutPage);