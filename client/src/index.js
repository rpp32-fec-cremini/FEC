import React from 'react';
import ReactDOM from 'react-dom';
import RatingContainer from '../src/Ratings/RatingContainer.jsx';
import RelatedList from '../src/Related/RelatedList.jsx';
import Overview from './Overview/overview.jsx';
import "./index.css"
import QandA from '../src/Q&A/QandA.jsx';
import OutfitList from '../src/Related/OutfitList.jsx';

var App = (props) => (
  <div id="app">
    {/* <Overview className='relatedCard' /> */}
    {/* <RelatedList /> */}
    {/* <OutfitList /> */}
    <RatingContainer productId={59554} />
    {/* <QandA /> */}
  </div>
)

ReactDOM.render(<App className="App" />, document.getElementById('root'));
