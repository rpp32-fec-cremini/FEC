import React from "react";

var getAverage = function(ratings={}) {
  var numVotes = 0;
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
  console.log(average)
  return (
    <div className="starOuter">
      {[...Array(5)].map((x, i) => {
        return (
          <span key={i}>&#9734;</span>
        )
      })}
    </div>
  )
}

var RatingBreakdown = ({meta}) => {
  var average = getAverage(meta.ratings);
  return (
    <div>
      <div>Rating & Reviews</div>
      <div className="ratingBreakdown">
        <div>{average}</div>
        <FractinalStars avg={average}/>
      </div>
      <div style={{"fontSize":"10px"}}>100% of reviews recommend this product</div>
      <div>bars</div>
    </div>
  )
}

export default RatingBreakdown;