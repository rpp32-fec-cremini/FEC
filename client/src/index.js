import React from 'react';
import ReactDOM from 'react-dom';
import RatingContainer from '../src/Ratings/RatingContainer.jsx';
import RelatedList from '../src/Related/RelatedList.jsx';
import "./index.css"
import QandA from '../src/Q&A/QandA.jsx';

var App = (props) => (
  <div id="app">
    <RelatedList />

    <RatingContainer productId={2}/>
    <QandA />
  </div>
)

ReactDOM.render(<App className="App"/>, document.getElementById('root'));
