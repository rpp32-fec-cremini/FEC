import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import { IoAdd } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";
import './related.css';
import Card from './Card.jsx';
import getClicks from "../getClicks.jsx";

class OutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfits: [],
      type: 'outfit',
      currentProduct: null
    }
  }

  componentDidMount() {
    this.getOutfits();
    this.setCurrentProduct(this.props.productId);
  }

  componentDidUpdate() {
    if (this.state.currentProduct === null || this.props.productId !== this.state.currentProduct.id) {
      this.setCurrentProduct();
    }
  }

  getOutfits = () => {
    let outfits = JSON.parse(localStorage.getItem('outfits'));
    if (localStorage.getItem('outfits') !== null) {
      this.setState({ outfits: outfits });
    }
  }

  setCurrentProduct = () => {
    $.get(`/products/${this.props.productId}`, data => {
      this.setState({ currentProduct: JSON.parse(data) });
    })
  };

  xClick = (id) => {
    let storedOutfits = JSON.parse(localStorage.getItem('outfits'));
    let index = storedOutfits.findIndex(obj => obj.id === id);
    storedOutfits.splice(index, 1);
    localStorage.setItem('outfits', JSON.stringify(storedOutfits));
    this.setState({ outfits: storedOutfits });
  }

  addClick = (id) => {
    this.setCurrentProduct(id);
    let outfit = this.state.currentProduct;
    this.setLocalStorage(outfit);
    if (!this.state.outfits.find(obj => obj.id === id)) {
      this.setState({ outfits: [...this.state.outfits, outfit] });
    }
  }

  setLocalStorage = (outfit) => {
    let storedOutfits = [];
    if (localStorage.getItem('outfits') === null) {
      storedOutfits.push(outfit);
      localStorage.setItem('outfits', JSON.stringify(storedOutfits));
    } else {
      storedOutfits = JSON.parse(localStorage.getItem('outfits'));
      if (!storedOutfits.find(obj => obj.id === outfit.id)) {
        storedOutfits.push(outfit);
        localStorage.setItem('outfits', JSON.stringify(storedOutfits));
      }
    }
  }

  //Pull items from local storage once current product is set
  // getOutfits = async () => {
  //   try {
  //     let outfits = await axios.get(`/products/${this.state.user}/outfits`);
  //     let data = outfits.data;
  //     data.forEach(outfit => {
  //       // this.getStyles(outfit.id, outfit);
  //       this.setState({ outfits: [...this.state.outfits, outfit] })
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // getStyles = async (id, product) => {
  //   try {
  //     let styles = await axios.get(`/products/${id}/styles`);
  //     if (styles.data.results[0].photos[0].thumbnail_url) {
  //       product['img'] = styles.data.results[0].photos[0].thumbnail_url;
  //     } else {
  //       let productLabel = product.name.toLowerCase().split(' ');
  //       product['img'] = `https://source.unsplash.com/230x330/?${productLabel[productLabel.length - 1]}`;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   return product;
  // }



  // getListPos = () => {


  // }

  // showArrows = () => {

  // }

  // leftPaddleScroll = () => {

  // }

  // rightPaddleScroll = () => {

  // }



  render() {
    return (
      <div data-testid='outfitContainer' className='related-container' >
        <h4 data-testid='outfitHeader' className='related-title' >YOUR OUTFIT</h4>
        <ul data-testid='outfitList' className='related-list'>
          <li data-testid='add-card' className='related-card related-add' onClick={(id) => this.addClick(this.props.productId)}>
            <div id='add-text'>
              <IoAdd id='add-icon' />
              <p>Add to Outfit</p>
            </div>
          </li>
          {this.state.outfits.map(outfit => (
            < Card key={outfit.id} product={outfit} type={this.state.type}
              actionClick={this.xClick} cardClick={() => { }} />
          ))
          }
        </ul >
        <IoIosArrowBack className='related-scroll left-scroll hide' />
        < IoIosArrowForward className='related-scroll right-scroll' />
      </div>
    )
  }
};

export default getClicks(OutfitList);