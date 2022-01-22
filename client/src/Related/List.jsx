import React, { useState } from 'react';
import $ from 'jquery';
import './related.css';
import Card from './Card.jsx';
import getClicks from "../getClicks.jsx";

const List = (props) => {

  // const [modalOpen, setmodalOpen] = useState(false);

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
      let star = false;
      if (e.target.parentNode.className === "action-btn" ||
        e.target.className === "action-btn") {
        star = true;
      }

      if (!star) {
        $('.compare').removeClass('show');
        $('.compare').addClass('hide');
        $('.related-container').parents('#root, body, html').css({ 'overflow': 'auto' });
        $('.related-list').css({ 'overflow-x': 'auto' });
      }
    });
  }

  return (
    <ul data-testid='list' className='related-list' id='related-list'>
      {props.relatedProducts.map((product, i) => (
        < Card key={product.id + i}
          product={product}
          type='related'
          actionClick={(id) => starClick(id)}
          setproductId={props.setproductId}
        />
      ))
      }
    </ul >
  )
}

export default getClicks(List);