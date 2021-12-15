import React from 'react';
import ReactDOM from 'react-dom';

const CartItem = (props) => {
  return(
    <div>
      <img src={background} />
      <h3>{props.item.name}</h3>
      <h4>{props.item.price}</h4>
    </div>
  )
}

export default CartItem;