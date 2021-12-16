import React from "react";

var StarRating = ({rating}) => {
  return (
    <div>
      {[...Array(rating)].map((filledStar, i) => {
        return (
          <span key={i} className="filledStar">&#9733;</span>
        )
      })}
      {[...Array(5 - rating)].map((emptyStar, i) => {
        return (
          <span key={i} className="emptyStar">&#9733;</span>
        )
      })}
    </div>
  )
}


var ReviewTile = ({id, starRating, dateWritten, summary, body, images, recommend, name, response, helpfulness}) => {
  var boldSummary = summary.length > 83 ? `${summary.substring(0,83)}...` : summary;
  return (
    <div className="ReviewBox" data-testid={id}>
      <div style={{
        "display":"grid",
        "gridTemplateColumns":"1fr 3fr 1fr",
        "margin": "10px 0 10px 0"
      }}>
        <StarRating rating={starRating} />
        <div style={{"gridColumnStart":"4"}}>{`${name}, ${dateWritten}`}</div>
      </div>

      <div style={{
        "fontWeight":"bold",
        "fontSize":"20px",
        "margin": "10px 0 5px 0"
      }}>{boldSummary}</div>
      <div style={{
        "fontSize":"16px",
        "margin": "0 0 10px 0"
      }}>{summary.substring(83)}</div>

      <div style={{
        "fontSize":"16px",
        "margin": "10px 0 10px 0"
      }}>{body}</div>

      <div style={{
        "margin": "10px 0 10px 0px",
        "display":"grid",
        "gridTemplateColumns":"repeat(5, 1fr)",
        "gridColumnGap": "5px"
      }}>
        {images.map(image => <img key={image.id} src={image.url}></img>)}
      </div>
      <div>recommend: {recommend}</div>
      <div>helpfulness: {helpfulness}</div>
    </div>
  )
}

export default ReviewTile;