import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import './related.css';
import Price from './Price.jsx'
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
      salePrice: null,
      regPrice: null,
      sale: false
    }
  };

  componentDidMount() {
    // this.displayWidth();
    this.getType();
    this.getStyleInfo(this.props.product.id, this.props.product.name, this.props.product.default_price);
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

  getStyleInfo = async (id, name, price) => {
    try {
      let discount = 30;
      let results = await axios.get(`/products/${id}/styles`);
      let styles = results.data.results;
      let defaultStyle = styles.find(style => style['default?'] === true) || styles[0];
      let defaultIndex = styles.findIndex(style => style['default?'] === true);
      defaultIndex = defaultIndex < 0 ? 0 : defaultIndex;
      // console.log(name, defaultStyle.photos[0].thumbnail_url, defaultIndex);
      // console.log(name, defaultStyle.sale_price, defaultIndex);
      if (defaultStyle.photos[0].thumbnail_url) {
        this.setState({ currentImage: defaultStyle.photos[0].thumbnail_url })
      } else {
        let productLabel = name.toLowerCase().split(' ');
        this.setState({ currentImage: `https://source.unsplash.com/230x330/?${productLabel[productLabel.length - 1]}` });
      }
      console.log(name, price, defaultIndex);
      // defaultStyle.sale_price ?
      //   this.setState({salePrice: (price - defaultStyle.sale_price).toFixed(2), regPrice: price, sale: true }) : this.setState({ regPrice: price });
      discount ?
        this.setState({ salePrice: (price - discount).toFixed(2), regPrice: price, sale: true }) : this.setState({ regPrice: price });
      console.log(this.state.salePrice, this.state.regPrice);
    } catch (err) {
      console.log(err);
    }
  };

  actionClick = (e) => {
    this.props.actionClick(this.props.product.id, e);
  }

  render() {
    let Action = this.state.actionName;
    let finalPrice = this.state.price;
    if (this.state.sale) {

    }
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
          <button className='action-btn' onClick={(e) => this.actionClick(e)}>
            <Action />
          </button>
          <div className='card-text'>
            <p className='card-category'>{this.props.product.category.toUpperCase()} </p>
            <p className='card-name'>{this.props.product.name}</p>
            <Price salePrice={this.state.salePrice} regPrice={this.state.regPrice} sale={this.state.sale} />
            {/* <p className='card-price'> {`$${this.state.currentPrice}`}</p> */}
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