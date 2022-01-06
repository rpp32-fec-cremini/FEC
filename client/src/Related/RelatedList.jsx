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
import Compare from './Compare.jsx';

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
      compProduct: {
        id: 456,
        name: 'Sample Comp Product',
        category: 'example'
      },
      products: [],
      relatedIDs: [],
      relatedProducts: [],
      relatedStyles: []
    }

  }

  componentDidMount() {
<<<<<<< HEAD
    this.getRelatedProducts();
=======
    this.getRelatedIDs();
    this.setCurrentProduct();
    this.setCompProduct(59553);
>>>>>>> f87575ec8258c2be54148f81a49b7351f7302acc
  }

  // getAllProducts = () => {
  //   $.get(`/products`, data => {
  //     let products = JSON.parse(data);
  //     this.setState({ products: products });
  //     // console.log(this.state.products);
  //   });
  // };

  getSingleProduct = (id) => {
    $.get(`/products/${id}`, data => {
      console.log(JSON.parse(data).name.toUpperCase());
      return JSON.parse(data);
    })
  };

  setCurrentProduct = () => {
    $.get(`/products/${this.state.currentProductID}`, data => {
      let currentProduct = JSON.parse(data);
      this.setState({ currentProduct: currentProduct });
    })
  };

  setCompProduct = (id) => {
    $.get(`/products/${id}`, data => {
      let compProduct = JSON.parse(data);
      this.setState({ compProduct: compProduct });
    })
  };

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
      console.log(data, err);
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

  starClick = (id) => {
    this.setCompProduct(id);
    $('.compare').removeClass('hide');
    $('.compare').addClass('show');
    $('.related-container').parents('#root, body, html').css({ 'overflow': 'hidden' });
    this.hideModal();
  }

  hideModal = () => {
    $('.related-container').parents('body').click((e) => {
      console.log(e.target.value);

      if (!$(e.target).hasClass('action-btn')) {
        $('.compare').removeClass('show');
        $('.compare').addClass('hide');
        $('.related-container').parents('#root, body, html').css({ 'overflow': 'auto' });
      }
    })
  }

  render() {
    return (
      <div>
        <div data-testid='listContainer' className='related-container top-container' >
          <h4 data-testid='listHeader' className='related-title' >RELATED PRODUCTS</h4>
          <ul data-testid='list' className='related-list'>
            {this.state.relatedProducts.map(product => (
              < Card key={product.id} product={product} type={this.state.type}
                actionClick={this.starClick} unClick={this.hideModal} />
            ))
            }
          </ul >
          <IoIosArrowBack className='related-scroll left-scroll' />
          < IoIosArrowForward className='right-scroll related-scroll' />
          <div className='compare hide'>
            <Compare className='show' currentItem={this.state.currentProduct} compProduct={this.state.compProduct} />
          </div>

        </div>
      </div>
    )
  }
};

export default RelatedList;