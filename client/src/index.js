import React from 'react';
import ReactDOM from 'react-dom';
import RatingContainer from '../src/Ratings/RatingContainer.jsx';
import QandA from '../src/Q&A/QandA.jsx';
import "./index.css"

var App = (props) => (
  // <RatingContainer/>
  <QandA />
)

ReactDOM.render(<App className="App"/>, document.getElementById('root'));
