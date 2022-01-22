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
  const max = 60000;
  const min = 59553;
  const randomProductId = Math.floor(Math.random() * (max - min + 1)) + min;
  const [productId, setproductId] = useState(randomProductId);
  const [dark, setDark] = useState(true);
  const [btnText, setBtnText] = useState(true);

  return (
    <div id="app">
<<<<<<< HEAD
      <Overview className='relatedCard' productId={productId} setproductId={setproductId} />
      <RelatedProducts productId={productId} setproductId={setproductId} />
      <OutfitList productId={productId} setproductId={setproductId} />
=======
      <button className="darkBtn" onClick={() => {
        $('#root').toggleClass("darkMode", dark);
        $('#top-container').toggleClass("darkModeText", dark);
        $('#outfit-container').toggleClass("darkModeText", dark);
        setDark(!dark);
        setBtnText(!btnText)
      }}>{btnText ? 'Dark Mode' : "Light Mode"}</button>
      <Overview className='relatedCard' productId={productId} />
      <RelatedProducts productId={productId} setproductId={setproductId} dark={dark} />
      <OutfitList productId={productId} setproductId={setproductId} dark={dark} />
>>>>>>> 659818107fa9d39d70e2dc5519a82d8aca632591
      <QandA productId={productId} />
      <RatingContainer productId={productId} />
    </div>
  )
}

ReactDOM.render(<App className="App" />, document.getElementById('root'));
