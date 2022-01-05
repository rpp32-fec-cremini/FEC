import React from 'react';
import axios from 'axios';
import './related.css';
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: <TiDeleteOutline className='action-btn' />,
      // actionName: TiDeleteOutline,
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
    this.props.type === 'outfit' ? this.setState({ action: <TiDeleteOutline className='action-btn' /> }) :
      this.setState({ action: <IoIosStarOutline className='action-btn' /> })
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
  }

  render() {
    return (
      <div data-testid='card' className='related-card'>
        <img src={this.state.currentImage} className='related-img' />
        {this.state.action}
        <div className='card-text'>
          <p className='card-category'>{this.props.product.category.toUpperCase()} </p>
          <div className='card-productInfo'>
            <p>{this.props.product.name}</p>
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