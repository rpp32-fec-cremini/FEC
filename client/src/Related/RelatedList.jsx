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
      type: 'related',
      currentProductID: 59556,
      currentProduct: {
        id: 123,
        name: 'Sample Product',
        category: 'example'
      },
      products: [],
      relatedProducts: [],
      relatedStyles: []
    }

  }

  componentDidMount() {
    // this.getAllProducts();
    // this.getCurrentProduct();
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
        // console.log('PRODUCT IDS ', productIds.data);
        productIds.data.forEach(id => {
          axios.get(`/products/${id}`)
            .then(product => {
              let currentProduct = product.data;
              // console.log('PRODUCT ', currentProduct);
              currentProduct = this.getStyles(id, currentProduct);
              relatedProducts.push(currentProduct);
              this.setState({ relatedProducts: relatedProducts });
              // console.log('related products', this.state.relatedProducts);
            })
            .catch(err => console.log(err))
        })
      })
      .catch(err => console.log(err))
  };

  getStyles = (id, product) => {
    // console.log('related in getStyles', this.state.relatedProducts);
    axios.get(`/products/${id}/styles`)
      .then(styles => {
        // console.log('styles id ', id);
        // console.log('styles.data.results ', styles.data.results[0].photos[0].thumbnail_url);
        if (styles.data.results[0].photos[0].thumbnail_url) {
          product.img = styles.data.results[0].photos[0].thumbnail_url;
        } else {
          let productLabel = product.name.toLowerCase().split(' ');
          product.img = `https://source.unsplash.com/230x330/?${productLabel[productLabel.length - 1]}`;
        }

      })
      .catch(err => console.log(err))
    return product;
  }

  render() {
    return (
      <div>
        {/* {this.getStyles()} */}
        <div data-testid='listContainer' className='related-container' >
          <h4 data-testid='listHeader' className='related-title' >RELATED PRODUCTS</h4>
          <div data-testid='list' className='related-list'>
            {this.state.relatedProducts.map(product => (
              // console.log('in render ', product.hasOwnProperty('img'))
              < Card key={product.id} product={product} type={this.state.type} />
            ))
            }
          </div >
          <IoIosArrowBack className='related-scroll left-scroll' />
          < IoIosArrowForward className='right-scroll related-scroll' />
        </div>
      </div>
    )
  }
};

export default RelatedList;