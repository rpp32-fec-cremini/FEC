import React from "react";

var ReviewTile = ({id, starRating, dateWritten, summary, body, images, recommend, name, response, helpfulness}) => (
  <div className="ReviewBox" data-testid={id}>
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