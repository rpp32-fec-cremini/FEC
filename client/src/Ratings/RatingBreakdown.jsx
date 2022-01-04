import React from "react";
import $ from 'jquery';

var numVotes = 0;

var getAverage = function(ratings={}) {
  // var numVotes = 0;
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


var FractinalStars = ({avg}) => {
  var average = avg - (avg % 0.25);
  var starPerc = (average/5) * 100;
  $(".stars-inner").css('width', `${starPerc}%`)
  return (
    <div className="stars-outer">
      <div className="stars-inner"></div>
    </div>
  )
}

var RatingBars = ({rating, count}) => {
  var perc = (count/numVotes) * 100;
  return (
    <div className="barBreakdown" id={`bar${rating}`} onClick={(e) => {
      if (e.target.className === 'barBreakdown') {
        console.log(e.target.id)
      } else {
        console.log(e.target.parentNode.id)
      }
    }}>
      <div className="ratingType">{`${rating} stars`}</div>
      <div className="bar-outer">
        <div className="bar-inner" style={{"width": `${perc}%`}}></div>
      </div>
      <div className="ratingCount">{count}</div>
    </div>)
}

var RatingBreakdown = ({meta}) => {
  var average = getAverage(meta.ratings);
  var rec = meta.recommended;
  var recPerc = rec ? ( parseInt(rec.true) / (parseInt(rec.true) + parseInt(rec.false)) ) * 100 : null
  return (
    <div>
      <div>Rating & Reviews</div>
      <div className="ratingBreakdown">
        <div className="ratingHeader">{average}</div>
        <FractinalStars avg={average}/>
      </div>
      <div>
        {!meta.ratings ? null : Object.keys(meta.ratings).map(num => <RatingBars rating={num} count={meta.ratings[num]} key={num}/>)}
      </div>
      <div className="numRecommend">{recPerc}% of reviews recommend this product</div>
    </div>
  )
}

export default RatingBreakdown;