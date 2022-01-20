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
  const [ quantity, setQuantity ] = useState('1');
  const [ buttonDisable, setButton ] = useState(false);
  const [ quantityDisable, setQDropDown ] = useState(true);

  function sizeHandler(e) {
    var value = document.getElementById('sizeSelect').value;
    console.log('SIZE CLICKED!! ', value)
    setSize(value);
  }

  function quantityHandler(e) {
    setQuantity(e.target.value);
  }



  for(var key in sku) {
    //console.log (`SIZE HERE: ${sku[key].size}, and quantity here: ${sku[key].quantity}`)
    sizes.push(sku[key].size);
    quantities.push(sku[key].quantity)
    totalQuantity += sku[key].quantity
    if(totalQuantity === 0) {
      console.log('SOLD OUT!!');
    }
  } console.log('HERES THE TOTAL ', totalQuantity)
    console.log('Yo yo yo', size)

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
      <select name ="Select Size" defaultValue = 'Select Size' className = "selectors spaceRight" id="sizeSelect" onChange = {sizeHandler}>
      <option value = "Select Size" hidden >Select Size</option>
       {sizes.map((sku) =>
          <option value = {sku} >{sku}</option>
          )}
      </select>

      <select name = "Select Quantity" defaultValue = 'Select Quantity' className = "selectors" disabled={quantityDisable}>
      <option value = "Select Quantity" hidden>-</option>
      {console.log('Current Quantity for SKU ', sku)}
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