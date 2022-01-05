import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";
import './related.css';
import Card from './Card.jsx';

class RelatedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProductID: 59556,
      currentProduct: {
        id: 123,
        name: 'Sample Product',
        category: 'example'
      },
      products: [],
      relatedProducts: []
    }

  }

  componentDidMount() {
    this.getRelatedProducts();
  }

  getAllProducts = () => {
    $.get(`/products`, data => {
      let products = JSON.parse(data);
      this.setState({ products: products });
      // console.log(this.state.products);
    });
  };

  getSingleProduct = (id) => {
    $.get(`/products/${id}`, data => {
      // console.log(JSON.parse(data));
      return JSON.parse(data);
    })
  };

  getCurrentProduct = () => {
    $.get(`/products/${this.state.currentProductID}`, data => {
      let currentProduct = JSON.parse(data);
      this.setState({ currentProduct: currentProduct });
      // console.log(currentProduct);
      return currentProduct;
    })
  };

  getRelatedProducts = () => {
    let relatedProducts = [];
    axios.get(`/products/${this.state.currentProductID}/related`)
      .then(productIds => {
        productIds.data.forEach(id => {
          axios.get(`/products/${id}`)
            .then(product => {
              relatedProducts.push(product.data)
              this.setState({ relatedProducts: relatedProducts });
              // console.log('related products', this.state.relatedProducts);
            })
            .catch(err => console.log(err))
        })
      })
      .catch(err => console.log(err))

  };

  render() {
    return (
      <div className='related' >
        <h4 data-testid='listHeader' className='related-title' >RELATED PRODUCTS</h4>
        <IoIosArrowBack className='related-scroll' />
        <div data-testid='container' className='related-list'>
          {this.state.relatedProducts.map(product => (
            <Card key={product.id} product={product} />
          ))
          }
        </div >
        < IoIosArrowForward className='related related-scroll' />
      </div>
    )
  }
};

export default RelatedList;

// {/*
//           {this.state.products.map(product => (
//             <div key={product.id} className='relatedCard'>
//               <h2>{product.name}</h2>
//               <h3>{product.category}</h3>
//             </div>
//           ))
//           } */}
          // {/* {
          //   <div key={this.state.currentProduct.id} className='related relatedCard'>
          //     <h2>{this.state.currentProduct.name}</h2>
          //     <h3>{this.state.currentProduct.category}</h3>
          //   </div>
          // } */}

          // {this.state.relatedProducts.map(product => (
          //   <div key={product.id} className='related related-card'>
          //     <h2>{product.name}</h2>
          //     <h3>{product.category}</h3>
          //   </div>
          // ))
          // }