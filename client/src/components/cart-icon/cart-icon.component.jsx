import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemCount } from '../../redux/cart/cart.selectors';

import { CartIconContainer, ShoppingIconStyles, ItemCountStyles } from './cart-icon.styles';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <CartIconContainer onClick={toggleCartHidden}>
        <ShoppingIconStyles />
        <ItemCountStyles>{itemCount}</ItemCountStyles>
    </CartIconContainer>
);

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemCount
});

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);