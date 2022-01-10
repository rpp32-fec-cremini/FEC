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

class OutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfits: [],
      type: 'outfit',
      currentProductId: 59554,
      currentProduct: null
    }
  }

  componentDidMount() {
    this.getOutfits();
    this.setCurrentProduct(this.state.currentProductId);
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
  getOutfits = () => {
    let outfits = JSON.parse(localStorage.getItem('outfits'));
    if (localStorage.getItem('outfits') !== null) {
      // let outfits = JSON.parse(localStorage.getItem('outfits'));
      this.setState({ outfits: outfits });
      console.log(true);
    }
  }

  getStyles = async (id, product) => {
    try {
      let styles = await axios.get(`/products/${id}/styles`);
      if (styles.data.results[0].photos[0].thumbnail_url) {
        product['img'] = styles.data.results[0].photos[0].thumbnail_url;
      } else {
        let productLabel = product.name.toLowerCase().split(' ');
        product['img'] = `https://source.unsplash.com/230x330/?${productLabel[productLabel.length - 1]}`;
      }
    } catch (err) {
      console.log(err);
    }
    return product;
  }

  setCurrentProduct = (id) => {
    $.get(`/products/${id}`, data => {
      console.log(JSON.parse(data).name.toUpperCase());
      this.setState({ currentProduct: JSON.parse(data) });
    })
  };

  getSingleProduct = (id) => {
    $.get(`/products/${id}`, data => {
      return JSON.parse(data);
    })
  };

  // getListPos = () => {


  // }

  // showArrows = () => {

  // }

  // leftPaddleScroll = () => {

  // }

  // rightPaddleScroll = () => {

  // }

  xClick = (id) => {
    let outfit = this.state.outfits.find(obj => obj.id === id);
    let filteredOutfits = this.state.outfits.filter(outfit => outfit.id !== id);
    this.setState({ outfits: filteredOutfits });
  }

  addClick = (id) => {
    console.log(id);
    this.setCurrentProduct(id);
    let outfit = this.state.currentProduct;
    this.setLocalStorage(outfit);
    console.log('BEFORE ', this.state.outfits.length);
    if (!this.state.outfits.find(obj => obj.id === id)) {
      this.setState({ outfits: [...this.state.outfits, outfit] });
    }
    console.log('AFTER ', this.state.outfits.length);
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

  render() {
    return (
      <div data-testid='outfitContainer' className='related-container' >
        <h4 data-testid='outfitHeader' className='related-title' >YOUR OUTFIT</h4>
        <ul data-testid='outfitList' className='related-list'>
          <li data-testid='add-card' className='related-card related-add' onClick={(id) => this.addClick(this.state.currentProductId)}>
            <div id='add-text'>
              <IoAdd id='add-icon' />
              <p>Add to Outfit</p>
            </div>
          </li>
          {this.state.outfits.map(outfit => (
            < Card key={outfit.id} product={outfit} type={this.state.type}
              actionClick={this.xClick} addClick={this.addClick} />
          ))
          }
        </ul >
        <IoIosArrowBack className='related-scroll left-scroll' />
        < IoIosArrowForward className='related-scroll right-scroll' />
      </div>
    )
  }
};

export default OutfitList;