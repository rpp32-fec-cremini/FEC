import React from 'react';
import ReactDOM from 'react-dom';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInfo: ""
    }
  }

  render() {
    return(
      <div>
        <p data-testid = 'prodInfo'>
          ProductInfo here
        </p>
      </div>
    )
  }
}

export default ProductInfo;