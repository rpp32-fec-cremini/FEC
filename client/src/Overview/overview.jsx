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

  getProducts() {
    axios.get(API_URL + '/products')
  }

  render() {
    return (
      <div>
        <h1 data-testid = 'overview'>
          Overview Here
        </h1>
        <ImageGallery />
        <ProductInfo />
        <StyleSelector />
        <AddToCart />

      </div>
    );
  }
}

ReactDOM.render(
  <Overview  />,
  document.getElementById('overview')
)