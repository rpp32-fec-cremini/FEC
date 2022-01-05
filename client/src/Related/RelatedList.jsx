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
      relatedIDs: [],
      relatedProducts: [],
      relatedStyles: []
    }

  }

  componentDidMount() {
    this.getRelatedIDs();
  }

  // getAllProducts = () => {
  //   $.get(`/products`, data => {
  //     let products = JSON.parse(data);
  //     this.setState({ products: products });
  //     // console.log(this.state.products);
  //   });
  // };

  // getSingleProduct = (id) => {
  //   $.get(`/products/${id}`, data => {
  //     // console.log(JSON.parse(data));
  //     return JSON.parse(data);
  //   })
  // };

  // getCurrentProduct = () => {
  //   $.get(`/products/${this.state.currentProductID}`, data => {
  //     let currentProduct = JSON.parse(data);
  //     this.setState({ currentProduct: currentProduct });
  //     // console.log(currentProduct);
  //     return currentProduct;
  //   })
  // };

  getRelatedIDs = async () => {
    let relatedIDs = [];
    try {
      let IDs = await axios.get(`/products/${this.state.currentProductID}/related`);
      let data = IDs.data;
      data.forEach(id => {
        relatedIDs.push(id);
        this.setRelatedProducts(id);
      })
      this.setState({ relatedIDs: relatedIDs });
    } catch (err) {
      console.log(err);
    }
  };

  setRelatedProducts = async (id) => {
    try {
      let product = await axios.get(`/products/${id}`);
      let data = product.data;
      // this.getStyles(id, data);
      this.setState({ relatedProducts: [...this.state.relatedProducts, data] });
    } catch (err) {
      console.log(err);
    }
  };

  getStyles = async (id, product) => {
    try {
      let styles = await axios.get(`/products/${id}/styles`);
      if (styles.data.results[0].photos[0].thumbnail_url) {
        product.img = styles.data.results[0].photos[0].thumbnail_url;
      } else {
        let productLabel = product.name.toLowerCase().split(' ');
        product['img'] = `https://source.unsplash.com/230x330/?${productLabel[productLabel.length - 1]}`;
      }
    } catch (err) {
      console.log(err);
    }
    return product;
  }

  render() {
    return (
      <div>
        <div data-testid='listContainer' className='related-container' >
          <h4 data-testid='listHeader' className='related-title' >RELATED PRODUCTS</h4>
          <div data-testid='list' className='related-list'>
            {this.state.relatedProducts.map(product => (
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