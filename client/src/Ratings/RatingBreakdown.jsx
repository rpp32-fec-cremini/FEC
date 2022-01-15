import React from "react";
import $ from 'jquery';
import getClicks from "../getClicks.jsx";

var numVotes = 0;

var getAverage = function(ratings={}) {
  numVotes = 0;
  var sumVotes = 0;
  for (var num in ratings) {
    numVotes += parseInt(ratings[num]);
    sumVotes += num * parseInt(ratings[num]);
  }

  if (!(sumVotes/numVotes)) return null
  var avg = (sumVotes/numVotes).toString().split('.');

  if (avg.length === 1) {
    return avg + '.0'
  } else {
    return avg[0] + '.' + avg[1][0]
  }
}


var FractionalStars = ({avg}) => {
  var average = avg - (avg % 0.25);
  var starPerc = (average/5) * 100;
  $(".stars-inner").css('width', `${starPerc}%`)
  return (
    <div className="stars-outer">
      <div className="stars-inner" data-testid="starRatings"></div>
    </div>
  )
}

var RatingBars = ({rating, count, changeFilter}) => {
  var perc = (count/numVotes) * 100;
  return (
    <div className="barBreakdown" id={`bar${rating}`} onClick={(e) => {
      if (e.target.className === 'barBreakdown') {
        var selected = e.target.id;
      } else if (e.target.className === 'bar-inner') {
        var selected = e.target.parentNode.parentNode.id;
      } else {
        var selected = e.target.parentNode.id;
      }
      changeFilter(selected)
    }}>
      <div className="ratingType">{`${rating} stars`}</div>
      <div className="bar-outer">
        <div className="bar-inner" style={{"width": `${perc}%`}}></div>
      </div>
      <div className="ratingCount">{count}</div>
    </div>)
}

var FilterInfo = ({filters, changeFilter}) => {
  return (<div className="filterInfo">
    <div>{`Filters Applied: stars ${filters.reduce((string, filter) => string + filter.substring(3) + ' ', '')}`}</div>
    <a className="removeFilters" onClick={() => {
      changeFilter('removeAll')
    }}>Remove All filters</a>
  </div>)
}

var RatingBreakdown = ({meta, changeFilter, filters, clicked}) => {
  var average = getAverage(meta.ratings);
  var rec = meta.recommended;
  var recPerc = rec ? Math.floor((parseInt(rec.true) / (parseInt(rec.true) + parseInt(rec.false))) * 100) : null
  return (
    <div onClick={(e) => clicked(e)}>
      <h1 className="Rating-Title">Rating & Reviews</h1>
      <div className="ratingBreakdown">
        <div className="ratingHeader">{average || 0}</div>
        <FractionalStars avg={average}/>
      </div><br></br>
      {filters.length ? <FilterInfo filters={filters} changeFilter={changeFilter}/> : <div className="filterInfo"></div>}
      <div>
        {!meta.ratings ? null : Object.keys(meta.ratings).map(num => <RatingBars rating={num} count={meta.ratings[num]} key={num} changeFilter={changeFilter}/>)}
      </div>
      <div className="numRecommend">{recPerc || 0}% of reviews recommend this product</div>
    </div>
  )
}

export default getClicks(RatingBreakdown);