import React from 'react';
import axios from 'axios';
import './related.css';
import Price from './Price.jsx'
import Rating from './Rating.jsx';
import { IoAdd } from "react-icons/io5";
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import getClicks from "../getClicks.jsx";

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
    this.getType();
    this.getStyleInfo(this.props.product.id, this.props.product.name, this.props.product.default_price);
  }

  getType = () => {
    this.props.type === 'outfit' ? this.setState({ actionName: TiDeleteOutline }) :
      this.setState({ actionName: IoIosStarOutline })
  }

  getStyleInfo = async (id, name, price) => {
    try {
      let discount = 30;
      let results = await axios.get(`/products/${id}/styles`);
      let styles = results.data.results;
      let defaultStyle = styles.find(style => style['default?'] === true) || styles[0];
      let defaultIndex = styles.findIndex(style => style['default?'] === true);
      defaultIndex = defaultIndex < 0 ? 0 : defaultIndex;
      if (defaultStyle.photos[0].thumbnail_url) {
        this.setState({ currentImage: defaultStyle.photos[0].thumbnail_url })
      } else {
        let productLabel = name.toLowerCase().split(' ');
        this.setState({ currentImage: `https://source.unsplash.com/230x330/?${productLabel[productLabel.length - 1]}` });
      }
      defaultStyle.sale_price ?
        this.setState(
          {
            salePrice: (price - defaultStyle.sale_price).toFixed(2),
            regPrice: price,
            sale: true
          })
        : this.setState({ regPrice: price });
    } catch (err) {
      console.log(err);
    }
  };

  changePage = (id, e) => {
    (e.target.parentNode.className === "action-btn" ||
      e.target.className === "action-btn") ? null :
      this.props.setproductId(id);
  }

  render() {
    let Action = this.state.actionName;
    return (
      <li data-testid='card' className='related-card' onClick={(e) => this.changePage(this.props.product.id, e)}
      >
        <img src={this.state.currentImage} className='related-img' />
        <button className='action-btn' onClick={(id) => this.props.actionClick(this.props.product.id)}>
          <Action />
        </button>
        <div className='card-text'>
          <p className='card-category'>{this.props.product.category.toUpperCase()} </p>
          <p className='card-name'>{this.props.product.name}</p>
          <Price salePrice={this.state.salePrice} regPrice={this.state.regPrice} sale={this.state.sale} />
          <Rating id={this.props.product.id} />
        </div>
      </li >
    )
  }
}

export default getClicks(Card);