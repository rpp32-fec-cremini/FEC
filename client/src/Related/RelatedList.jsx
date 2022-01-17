import React from 'react';
import $ from 'jquery';
import './related.css';
import Card from './Card.jsx';
import getClicks from "../getClicks.jsx";

const RelatedList = (props) => {

  const starClick = (id) => {
    props.setCompProduct(id);
    $('.compare').removeClass('hide');
    $('.compare').addClass('show');
    $('.related-container').parents('#root, body, html').css({ 'overflow': 'hidden' });
    $('.related-list').css({ 'overflow-x': 'hidden' });
    hideModal();
  }

  const hideModal = () => {
    $('.related-container').parents('body').click((e) => {
      let isStar = false;
      if (e.target.parentNode.className === "action-btn" ||
        e.target.className === "action-btn") {
        isStar = true;
      }

      if (!isStar) {
        $('.compare').removeClass('show');
        $('.compare').addClass('hide');
        $('.related-container').parents('#root, body, html').css({ 'overflow': 'auto' });
        $('.related-list').css({ 'overflow-x': 'auto' });
      }
    });
  }

  const isStar = (e) => {
    console.log(e.className);
    let isStar = false;
    if (e.target.parentNode.className === "action-btn" ||
      e.target.className === "action-btn") {
      isStar = true;
    }
    return isStar;
  }


  return (
    <ul data-testid='list' className='related-list' id='related-list'>
      {props.relatedProducts.map((product, i) => (
        < Card key={product.id + i}
          product={product} type='related'
          actionClick={starClick}
          mainProduct={props.mainProduct}
          setproductId={props.setproductId}
        />
      ))
      }
    </ul >
  )
}

export default getClicks(RelatedList);