import React from 'react';
import ReactDOM from 'react-dom';
//import CartItem from './cartComponents/cartItems.jsx';

class AddToCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentCart: []
    }
  }


  render () {
    return (
      <div>
      <h4 data-testid = 'cart'>Cart</h4>
      </div>

    )
  }
}

export default AddToCart;