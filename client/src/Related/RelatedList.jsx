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
import getClicks from "../getClicks.jsx";

class RelatedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'related',
      products: [],
      mainProductID: 59553,
      mainProduct: {
        id: 59553,
        campus: 'hr-rpp',
        name: 'Camo Onesie',
        slogan: 'Blend in to your crowd',
        description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
        category: 'Jackets',
        default_price: 140.00,
        created_at: '2021-10-18T22:50:41.839Z',
        updated_at: '2021-10-18T22:50:41.839Z',
        features: [
          {
            feature: 'Fabric',
            value: 'Canvas'
          },
          {
            feature: 'Buttons',
            value: 'Brass'
          }
        ]
      },
      mainProduct2: {
        id: 59553,
        campus: 'hr-rpp',
        name: 'YEasy 350',
        slogan: 'Just jumped over jumpman',
        description: 'These stretchy knit shoes show off asymmetrical lacing and a big sculpted rubber midsole. In a nod to adidas soccer heritage',
        category: 'Kicks',
        default_price: 450.00,
        created_at: '2021-10-18T22:50:41.839Z',
        updated_at: '2021-10-18T22:50:41.839Z',
        features: [
          {
            feature: 'Sole',
            value: 'Rubber'
          },
          {
            feature: 'Material',
            value: 'FullControlSkin'
          },
          {
            feature: 'Stitching',
            value: 'Double Stitch'
          }
        ]
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
    this.getAllProducts();
    this.getRelatedIDs();
    // this.setMainProduct();
    this.setCompProduct(59555);
  }

  getAllProducts = () => {
    $.get(`/products`, data => {
      let products = JSON.parse(data);
      this.setState({ products: products });
    });
  };

  setMainProduct = () => {
    $.get(`/products/${this.state.mainProductID}`, data => {
      let mainProduct = JSON.parse(data);
      this.setState({ mainProduct: mainProduct });
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
      let IDs = await axios.get(`/products/${this.state.mainProductID}/related`);
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

  // getStyles = async (id, product) => {
  //   try {
  //     let styles = await axios.get(`/products/${id}/styles`);
  //     if (styles.data.results[0].photos[0].thumbnail_url) {
  //       product.img = styles.data.results[0].photos[0].thumbnail_url;
  //     } else {
  //       let productLabel = product.name.toLowerCase().split(' ');
  //       product['img'] = `https://source.unsplash.com/230x330/?${productLabel[productLabel.length - 1]}`;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   return product;
  // }

  starClick = (id, e) => {
    this.setCompProduct(id);
    $('.compare').removeClass('hide');
    $('.compare').addClass('show');
    $('.related-container').parents('#root, body, html').css({ 'overflow': 'hidden' });
    this.hideModal(e);
  }

  hideModal = (e) => {
    $('.related-container').parents('body').click((e) => {
      if (e.target.parentNode.className === "action-btn") {
        var selected = 'star'
      } else if (e.target.className === "action-btn") {
        selected = 'btn';
      }

      if (selected != "star" && selected != "btn") {
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
                actionClick={this.starClick} mainProduct={this.state.mainProduct} />
            ))
            }
          </ul >
          <IoIosArrowBack className='related-scroll left-scroll' />
          < IoIosArrowForward className='right-scroll related-scroll' />
          <div className='compare hide'>
            <Compare className='show' mainProduct={this.state.mainProduct} compProduct={this.state.compProduct} />
          </div>
        </div>
      </div>
    )
  }
};

export default getClicks(RelatedList);