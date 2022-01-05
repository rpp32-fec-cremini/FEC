import React from 'react';
import axios from 'axios';
import './related.css';
import { IoAdd } from "react-icons/io5";
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actionName: TiDeleteOutline,
      currentImage: null,
      currentPrice: null
    }
  };

  componentDidMount() {
    // this.displayWidth();
    this.getType();
    this.getStyleInfo(this.props.product.id, this.props.product.name);
  }

  // displayWidth = () => {
  //   console.log(window.getComputedStyle(this.refs.card).getPropertyValue("width"));
  // }

  getType = () => {
    this.props.type === 'outfit' ? this.setState({ actionName: TiDeleteOutline }) :
      this.setState({ actionName: IoIosStarOutline })
  }

  // getStyleInfo = (id, name) => {
  //   axios.get(`/products/${id}/styles`)
  //     .then(styles => {
  //       if (styles.data.results[0].photos[0].thumbnail_url) {
  //         this.setState({ currentImage: styles.data.results[0].photos[0].thumbnail_url })
  //       } else {
  //         let productLabel = name.toLowerCase().split(' ');
  //         this.setState({ currentImage: `https://source.unsplash.com/230x330/?${productLabel[productLabel.length - 1]}` });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  getStyleInfo = async (id, name) => {
    try {
      let styles = await axios.get(`/products/${id}/styles`);
      if (styles.data.results[0].photos[0].thumbnail_url) {
        this.setState({ currentImage: styles.data.results[0].photos[0].thumbnail_url })
      } else {
        let productLabel = name.toLowerCase().split(' ');
        this.setState({ currentImage: `https://source.unsplash.com/230x330/?${productLabel[productLabel.length - 1]}` });
      }
    } catch (err) {
      console.log(err);
    }
  };

  actionClick = () => {
    this.props.actionClick(this.props.product.id);
  }

  render() {
    let Action = this.state.actionName;
    if (this.props.product.id === '000') {
      return (
        <li data-testid='card' className='related-card related-add' onClick={(product) => this.props.addClick(this.props.product)}>
          <div id='add-text'>
            <IoAdd id='add-icon' />
            <p>Add to Outfit</p>
          </div>
        </li>
      )
    } else {
      return (
        <li data-testid='card' className='related-card'>
          <img src={this.state.currentImage} className='related-img' />
          <button className='action-btn' onClick={this.actionClick}>
            <Action />
          </button>
          <div className='card-text'>
            <p className='card-category'>{this.props.product.category.toUpperCase()} </p>
            <p className='card-name'>{this.props.product.name}</p>
            <p className='card-price'> $100</p>
            <div className='card-stars'>
              <IoIosStarOutline className='card-star' />
              <IoIosStarOutline className='card-star' />
              <IoIosStarOutline className='card-star' />
              <IoIosStarOutline className='card-star' />
              <IoIosStarOutline className='card-star' />
            </div>
          </div>
        </li>
      )
    }
  }
}

export default Card;