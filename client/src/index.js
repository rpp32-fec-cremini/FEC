import React from 'react';
import ReactDOM from 'react-dom';
import RatingContainer from '../src/Ratings/RatingContainer.jsx';
import "./index.css"

var App = (props) => (
  <RatingContainer/>
)

ReactDOM.render(<App className="App"/>, document.getElementById('root'));
