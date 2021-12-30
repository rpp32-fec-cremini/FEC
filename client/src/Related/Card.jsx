import React from 'react';
import './related.css';
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";

class Card extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div data-testid='card' className='related-card'>
        <img src='https://source.unsplash.com/160x200/?sweatpants' className='related-img' />
        <div className='card-text'>
          <p>{this.props.product.category.toUpperCase()} </p>
          <h4>{this.props.product.name}</h4>
          <h4>Product Info</h4>
          <p>$100</p>
          <IoIosStarOutline />
          <IoIosStarOutline />
          <IoIosStarOutline />
          <IoIosStarOutline />
          <IoIosStarOutline />
        </div>
      </div>
    )
  }
}

export default Card;