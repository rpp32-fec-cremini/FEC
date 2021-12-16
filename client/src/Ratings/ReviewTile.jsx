import React from "react";

var StarRating = ({rating}) => {
  return (
    <div>
      {[...Array(rating)].map(filledStar => {
        return (
          <span className="filledStar">&#9733;</span>
        )
      })}
      {[...Array(5 - rating)].map(emptyStar => {
        return (
          <span className="emptyStar">&#9733;</span>
        )
      })}
    </div>
  )
}

var ReviewTile = ({id, starRating, dateWritten, summary, body, images, recommend, name, response, helpfulness}) => (
  <div className="ReviewBox" data-testid={id}>
    <StarRating rating={starRating} />
    <h4>Individual Review Tile</h4>
    <div>starRating: {starRating}</div>
    <div>dateWritten: {dateWritten}</div>
    <div>summary: {summary}</div>
    <div>body: {body}</div>
    <div>recommend: {recommend}</div>
    <div>name: {name}</div>
    <div>helpfulness: {helpfulness}</div>
  </div>
)

export default ReviewTile;