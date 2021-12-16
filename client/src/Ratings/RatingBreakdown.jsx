import React from "react";

var RatingBreakdown = (props) => (
  <div>
    <div>Rating & Reviews</div>
    <div className="inline">
      <h1>3.5</h1>
      <div>stars</div>
    </div>
    <div style={{"fontSize":"10px"}}>100% of reviews recommend this product</div>
    <div>bars</div>
  </div>
)

export default RatingBreakdown;