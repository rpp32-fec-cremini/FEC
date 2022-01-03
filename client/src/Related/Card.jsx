import React from 'react';
import './related.css';
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: <TiDeleteOutline className='action-btn' />
    }
  };

  componentDidMount() {
    this.displayWidth();
    this.getType();
  }

  displayWidth = () => {
    console.log(window.getComputedStyle(this.refs.card).getPropertyValue("width"));
  }

  getType = () => {
    this.props.type === 'outfit' ? this.setState({ action: <TiDeleteOutline className='action-btn' /> }) :
      this.setState({ action: <IoIosStarOutline className='action-btn' /> })
  }

  render() {
    return (
      <div data-testid='card' ref={'card'} className='related-card'>
        <img src='https://source.unsplash.com/150x160/?white' className='related-img' />
        {this.state.action}
        <div className='card-text'>
          <p className='card-category'>{this.props.product.category.toUpperCase()} </p>
          <div className='card-productInfo'>
            <p>{this.props.product.name}</p>
            <p>Product Info</p>
          </div>
          <p className='card-price'> $100</p>
          <div className='card-stars'>
            <IoIosStarOutline className='card-star' />
            <IoIosStarOutline className='card-star' />
            <IoIosStarOutline className='card-star' />
            <IoIosStarOutline className='card-star' />
            <IoIosStarOutline className='card-star' />
          </div>
        </div>
      </div>
    )
  }
}

export default Card;