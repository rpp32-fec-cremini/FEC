import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import RatingContainer from '../src/Ratings/RatingContainer.jsx';
import RelatedList from '../src/Related/RelatedList.jsx';
import Overview from './Overview/overview.jsx';
import "./index.css"
import QandA from '../src/Q&A/QandA.jsx';
import OutfitList from '../src/Related/OutfitList.jsx';

var App = (props) => {
  const max = 60000;
  const min = 59553;
  const randomProductId = Math.floor(Math.random() * (max - min + 1)) + min;
  const [productId, setproductId] = useState(randomProductId);

  return (
    <div id="app">
      <Overview className='relatedCard' productId={productId} />
      <RelatedList productId={productId} setproductId={setproductId} />
      <OutfitList productId={productId} setproductId={setproductId} />
      <QandA productId={59630} />
      <RatingContainer productId={productId} />
    </div>
  )
}

ReactDOM.render(<App className="App" />, document.getElementById('root'));
