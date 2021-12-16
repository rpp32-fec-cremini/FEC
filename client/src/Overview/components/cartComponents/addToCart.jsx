import React from 'react';
import ReactDOM from 'react-dom';

class AddToCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentCart: []
    }
  }


  render () {
    return (
      <h4 data-testid = 'cart'>Cart</h4>
      <CartItem />

    )
  }
}

export default AddToCart;