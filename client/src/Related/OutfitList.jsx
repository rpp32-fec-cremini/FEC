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
      outfits: []
    }
  }

  componentDidMount() {
    this.getOutfits();
  }


  getOutfits = () => {
    let outfitArr = [];
    axios.get(`/products/${this.state.user}/outfits`)
      .then(outfits => {
        // console.log(outfits);
        outfits.data.forEach(outfit => {
          // console.log(outfit);
          outfitArr.push(outfit);
          // console.log(outfitArr);
        })
        this.setState({ outfits: outfitArr });
      })
  }

  render() {
    return (
      <div data-testid='outfitContainer' className='related' >
        <h4 data-testid='outfitHeader' className='related-title' >YOUR OUTFIT</h4>
        <IoIosArrowBack className='related-scroll' />
        <div data-testid='outfitList' className='related-list'>
          {this.state.outfits.map(outfit => (
            <Card key={outfit.id} product={outfit} />
          ))
          }
        </div >
        < IoIosArrowForward className='related related-scroll' />
      </div>
    )
  }
};

export default OutfitList;