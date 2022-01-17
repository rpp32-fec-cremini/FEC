import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
//import CartItem from './cartComponents/cartItems.jsx';
//needs to say out of stock if ALL size have no quantity

const AddToCart = (props) =>  {

  var totalQuantity = 0; //if it ends up 0, then its out of stock for sure
  var sku = props.currentStyle.skus
  var sizes = [];
  var quantities = [];

  for(var key in sku) {
    console.log (`SIZE HERE: ${sku[key].size}, and quantity here: ${sku[key].quantity}`)
    sizes.push(sku[key].size);
    quantities.push(sku[key].quantity)
    totalQuantity += sku[key].quantity
    if(totalQuantity === 0) {
      console.log('SOLD OUT!!');
    }
  } console.log('HERES THE TOTAL ', totalQuantity)

  const renderSelection = () => {

    if(!props) {
      return
        <div>
          <h1>NO SKUUUUUSS, VERY SUS</h1>
        </div>

    } else if (totalQuantity === 0) {

      return
        <div>
        <select name ="Select Size" defaultValue = 'Select Size' className = "selectors spaceRight">
          <option value = "Select Size" >Out of Stock!</option>
          {/* <option value = "Select Size" selected disabled hidden>Select Size</option> */}
        </select>
        {/* <select name = "Select Quantity" className = "selectors">
        <option value = "Select Quantity" selected disabled hidden>Quantity</option>
        </select> */}
        <br></br>
        <br></br>
        <button>Add to Cart</button>
        </div>

    } else {
      return <div>
      <select name ="Select Size" defaultValue = 'Select Size' className = "selectors spaceRight">
      <option value = "Select Size" hidden >Select Size</option>
       {sizes.map((sku) =>
          <option value = {sku}>{sku}</option>
          )}
      </select>
      <select name = "Select Quantity" defaultValue = 'Select Quantity' className = "selectors">
      <option value = "Select Quantity" disabled hidden>-</option>
      {quantities.map((q) =>
          <option value = {q}>{q}</option>
          )}
      </select>
      <br></br>
      <br></br>
      <button>Add to Cart</button>
      </div>
    }
  }

    return (
      <div>
        {renderSelection()}
      </div>
    )}

export default AddToCart;