import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
//import CartItem from './cartComponents/cartItems.jsx';
//needs to say out of stock if ALL size have no quantity

const AddToCart = (props) =>  {

  var totalQuantity = 0; //if it ends up 0, then its out of stock for sure
  var sku = props.currentStyle.skus
  var sizes = [];
  var quantities = [];

  const [ size, setSize ] = useState('');
  const [ quantity, setQuantity ] = useState('');
  const [ buttonDisable, setButton ] = useState(true);
  const [ quantityDisable, setQDropDown ] = useState(false);

  function sizeHandler(e) {
    var value = document.getElementById('sizeSelect').value;
    setQDropDown(true);
    setSize(value);
  }

  function quantityHandler(e) {
    setQuantity(e.target.value);
  }

  function makeDropdown(size, sku) {
    let quan = [];
    for (var key in sku) {
      if (sku[key].size === size) {
        if (sku[key].quantity > 15) {
          for(var i = 1; i <= 15; i++) {
            quan.push(<option value = {i}>{i}</option>);
          }
        } else {
          for(var j = 1; j <= sku[key].quantity; j++) {
            quan.push(<option value = {j}>{j}</option>);
          }}
        }
      }
    return quan;
  }



  for(var key in sku) {
    sizes.push(sku[key].size);
    quantities.push(sku[key].quantity)
    totalQuantity += sku[key].quantity
    if(totalQuantity === 0) {
      console.log('SOLD OUT!!');
    }
  }
  const renderSelection = () => {
    ///////Checking to see if any props have been passed in
    if(!props) {
      return
        <div>
          <h1>NO SKUUUUUSS, VERY SUS</h1>
        </div>

    ///////If the total quantity of all size of the specific style is 0
    } else if (totalQuantity === 0) {

      return
        <div>
        <select name ="Select Size" defaultValue = 'Select Size' className = "selectors spaceRight">
          <option value = "Select Size" >Out of Stock!</option>
        </select>
        <br></br>
        <br></br>
        <button hidden>Add to Cart</button>
        </div>

    ///// If everything comes out right and with quantity
    } else {
      return <div>
      <b hidden = {size !== ''}>Please select a size</b> <br></br>
      <select name ="Select Size" defaultValue = 'Select Size' className = "selectors spaceRight" id="sizeSelect" onChange = {sizeHandler}>
      <option value = "Select Size" hidden >Select Size</option>
       {sizes.map((sku) =>
          <option value = {sku} >{sku}</option>
          )}
      </select>

      <select name = "Select Quantity" defaultValue = 'Select Quantity' className = "selectors" onClick ={()=> setButton(false)}>
      <option value = "Select Quantity" hidden>-</option>
      {makeDropdown(size, sku)}
      </select>

      <br></br>
      <br></br>
      <button disabled={buttonDisable} >Add to Cart</button>
      </div>
    }
  }

  return (
    <div>
      {renderSelection()}
    </div>
  )}

export default AddToCart;