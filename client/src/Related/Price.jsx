import React from 'react';
import './related.css';
import getClicks from '../getClicks.jsx';

const Price = (props) => {
  if (props.salePrice) {
    return (
      <div className='card-price'>
        <span className='sale'>{`$${props.salePrice} `}</span>
        <span className='reg-price'>{` $${props.regPrice}`}</span>
      </div>
    )
  } else {
    return (
      <div className='card-price'>
        <span>{`$${props.regPrice}`}</span>
      </div>
    )
  }
}
export default getClicks(Price);