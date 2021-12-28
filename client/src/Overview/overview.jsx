import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import ProductInfo from './components/productInformation.jsx';
import StyleSelector from './components/styleComponents/styleSelector.jsx';
import ImageGallery from './components/imageGallery.jsx';
import AddToCart from './components/cartComponents/addToCart.jsx';

//  //URL FOR API
const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

 /*  getProducts() {
    axios.get(API_URL + '/products')
  } */

  render() {
    return (
      <div>
        <div className='related relatedContainer grid-3'>
        {/* <ImageGallery className=' related relatedCard '  /> */}
        <ProductInfo className=' related relatedCard'  />
        {/* <AddToCart /> */}
        <br></br>
      </div>
      <StyleSelector className=' related relatedCard' />
      </div>
    );
  }
}

export default Overview;