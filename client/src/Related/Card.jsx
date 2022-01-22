import React, { useState, useEffect } from 'react';
import axios from 'axios';
import $ from 'jquery';
import './related.css';
import Price from './Price.jsx'
import Rating from './Rating.jsx';
import { IoAdd } from "react-icons/io5";
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import getClicks from "../getClicks.jsx";

const Card = (props) => {
  const [currentImage, setcurrentImage] = useState(null);
  const [salePrice, setsalePrice] = useState(null);
  const [regPrice, setregPrice] = useState(null);

  useEffect(() => {
    getStyleInfo(props.product.id, props.product.name,
      props.product.default_price);
  }, [props.product]);

  const getStyleInfo = async (id, name, price) => {
    try {
      let discount = 30;
      let results = await axios.get(`/products/${id}/styles`);
      let styles = results.data.results;
      let defaultStyle = styles.find(style => style['default?'] === true) || styles[0];
      let defaultIndex = styles.findIndex(style => style['default?'] === true);
      defaultIndex = defaultIndex < 0 ? 0 : defaultIndex;
      if (defaultStyle.photos[0].thumbnail_url) {
        let defaultImg = defaultStyle.photos[0].thumbnail_url[0] !== 'h' ?
          defaultStyle.photos[0].thumbnail_url.slice(1) :
          defaultStyle.photos[0].thumbnail_url;
        setcurrentImage(defaultImg);
      } else {
        let productLabel = name.toLowerCase().split(' ');
        setcurrentImage(`https://source.unsplash.com/230x330/?${productLabel[productLabel.length - 1]}`);
      }
      defaultStyle.sale_price ? (
        setsalePrice((price - defaultStyle.sale_price).toFixed(2)),
        setregPrice(price)
      )
        : setregPrice(price);
    } catch (err) {
      console.log(err);
    }
  };

  const changePage = (id, e) => {
    (e.target.parentNode.className === "action-btn" ||
      e.target.className === "action-btn") ? null :
      props.setproductId(id);
  }


  let Action = props.type === 'outfit' ? TiDeleteOutline : IoIosStarOutline;
  let aria = props.type === 'related' ? 'Compare' : 'Delete';
  let alt = `${props.product.name}`;
  let classList = props.dark ? 'related-card' : 'related-card darkModeBackground';

  return (
    <li data-testid='card' className={classList} onClick={(e) => changePage(props.product.id, e)}
    >
      <img src={currentImage} alt={alt} width='191' height='194' className='related-img' />
      <button aria-label={aria} className='action-btn' onClick={(id) => props.actionClick(props.product.id)}>
        <Action />
      </button>
      <div className='card-text'>
        <p className='card-category'>{props.product.category.toUpperCase()} </p>
        <p className='card-name'>{props.product.name}</p>
        <Price salePrice={salePrice} regPrice={regPrice} />
        <Rating id={props.product.id} />
      </div>
    </li >
  )
}

export default getClicks(Card);