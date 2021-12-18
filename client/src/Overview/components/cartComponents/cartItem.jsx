import React from 'react';
import ReactDOM from 'react-dom';

const CartItem = (props) => {
  return(
    <div>
      <h3>{props.product.name}</h3>
      <h4>{props.product.price}</h4>
      <h4>{props.product.sku_id}</h4>
    </div>
  )
}

export default CartItem;