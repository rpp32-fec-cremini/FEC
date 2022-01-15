import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
//import CartItem from './cartComponents/cartItems.jsx';

const AddToCart = (props) =>  {
  var sizeArray = [];
  for(var key in props.currentStyle.skus) {
    sizeArray.push(props.currentStyle.skus[key])
  }
  console.log('HERES THE CURRENTSTYLE!! ', sizeArray)
  if(!props) {
    return (
      <div>
        <h1>NO SKUUUUUSS, VERY SUS</h1>
      </div>
    )
  } else {
    return (
    <div>
      <select name ="Select Size" className = "selectors spaceRight">
      <option value = "Select Size" selected disabled hidden>Select Size</option>
        {sizeArray.map((sku) =>
          sku.quantity === 0 ? console.log('Outta stock') : <option value = {sku.size}>{sku.size}</option>
          )}

      </select>
      <select name = "Select Quantity" className = "selectors">
      <option value = "Select Quantity" selected disabled hidden>Quantity</option>
      </select>
      <br></br>
      <br></br>
      <button>Add to Cart</button>
      </div>
    )}
  }

export default AddToCart;