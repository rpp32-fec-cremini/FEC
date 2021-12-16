import React from 'react';
import $ from 'jquery';

class RelatedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProductID: 31,
      currentProduct: {},
      products: []

    }
  }

  componentDidMount() {
    this.getAllProducts();


  }

  getAllProducts = () => {
    $.get(`/products`, data => {
      let products = JSON.parse(data);
      this.setState({ products: products });
      console.log(this.state.products);
    });
  };

  getCurentProduct = () => {
    //may need to change syntax to `/?product_id=${this.state.currentProductID for API
    $.get(`/products/${this.state.currentProductID}`, data => {
      let currentProduct = JSON.parse(data);
      console.log(currentProduct)
      this.setState({ currentProduct: currentProduct });
      // console.log(this.state.currentProduct.name);
    })
  }

  render() {
    return (
      <div>
        <h3>RELATED PRODUCTS</h3>
        <div data-testid='container' className="relatedContainer grid-3 related">
          {this.state.products.map(product => (
            <div key={product.id} className='relatedCard related'>
              <h2>{product.name}</h2>
              <h3>{product.category}</h3>
            </div>
          ))
          }
          {this.state.currentProduct.description}
        </div >
      </div>
    )
  }
};

export default RelatedList;