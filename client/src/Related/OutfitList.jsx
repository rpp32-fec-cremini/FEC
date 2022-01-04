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

class OutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 123,
      outfits: [],
      type: 'outfit'
    }
  }

  componentDidMount() {
    this.getOutfits();
  }

  getOutfits = async () => {
    try {
      let outfits = await axios.get(`/products/${this.state.user}/outfits`);
      let data = outfits.data;
      data.forEach(outfit => {
        // this.getStyles(outfit.id, outfit);
        this.setState({ outfits: [...this.state.outfits, outfit] })
      });
    } catch (err) {
      console.log(err);
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
        <div data-testid='outfitList' className='related-list'>
          {this.state.outfits.map(outfit => (
            < Card key={outfit.id} product={outfit} type={this.state.type} />
          ))
          }
        </div >
        <IoIosArrowBack className='related-scroll left-scroll' />
        < IoIosArrowForward className='related-scroll right-scroll' />
      </div>
    )
  }
};

export default OutfitList;