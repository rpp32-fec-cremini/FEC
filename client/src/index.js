import React from 'react';
import ReactDOM from 'react-dom';
import RatingContainer from '../src/Ratings/RatingContainer.jsx';
import QandA from '../src/Q&A/QandA.jsx';
import "./index.css"

var App = (props) => (
  <div id="app">
    <RelatedList />
    <RatingContainer productId={2}/>
  </div>
)

ReactDOM.render(<App className="App"/>, document.getElementById('root'));
