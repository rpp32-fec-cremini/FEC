import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import RatingContainer from '../src/Ratings/RatingContainer.jsx';
import RelatedProducts from '../src/Related/RelatedProducts.jsx';
import Overview from './Overview/overview.jsx';
import "./index.css"
import QandA from '../src/Q&A/QandA.jsx';
import OutfitList from '../src/Related/OutfitList.jsx';

var App = (props) => {
  const max = 64620;
  const min = 64620;
  const randomProductId = Math.floor(Math.random() * (max - min + 1)) + min;
  const [productId, setproductId] = useState(randomProductId);
  const [dark, setDark] = useState(true);
  const [btnText, setBtnText] = useState(true);

  return (
    <div id="app">
      <Overview className='relatedCard' productId={productId} setproductId={setproductId} />
      <RelatedProducts productId={productId} setproductId={setproductId} />
      <OutfitList productId={productId} setproductId={setproductId} />
      <QandA productId={productId} />
      <RatingContainer productId={productId} />
    </div>
  )
}

ReactDOM.render(<App className="App" />, document.getElementById('root'));
