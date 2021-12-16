import React from 'react';
import ReactDOM from 'react-dom';
import RatingContainer from '../src/Ratings/RatingContainer.jsx';
import RelatedList from '../src/Related/RelatedList.jsx';
import "./index.css"

var App = (props) => (
  <div>
    <RelatedList />
    <RatingContainer />
  </div>
)

ReactDOM.render(<App className="App" />, document.getElementById('root'));
