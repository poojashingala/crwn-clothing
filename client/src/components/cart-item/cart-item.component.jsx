import React from 'react';

import { 
    CartItemContainer,
    CartItemImageStyles,
    ItemDetailsContainer,
    NameStyles,
    PriceStyles
 } from './cart-item.styles'

const CartItem = ({ item: {imageUrl, name, price, quantity} }) => (
    <CartItemContainer>
        <CartItemImageStyles src={imageUrl} alt="item" />
        <ItemDetailsContainer>
            <NameStyles>{name}</NameStyles>
            <PriceStyles>
                {quantity} X ${price}
            </PriceStyles>
        </ItemDetailsContainer>
    </CartItemContainer>
)

export default React.memo(CartItem);