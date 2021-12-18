import React from "react";
import $ from "jquery";

import Modal from "./Modal.jsx"

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
  if (body.split(" ").length > 250) {
    var reviewBody = <div>
      <div className="reviewBody reviewBodyFull" id={`body${id}`}>{`${body.split(" ").slice(0,250).join(" ")}...`}</div>
      <a
        id={`link${id}`}
        style={{
          "fontSize": "14px"
        }}
        onClick={() => {
          $(`#body${id}`).html(body)
          $(`#body${id}`).removeClass("reviewBody")
          $(`#link${id}`).remove()
        }}
    >Show More</a>
    </div>
  } else {
    var reviewBody = <div className="reviewBodyFull">{body}</div>
  }
  return (
    <div className="ReviewBox ReviewTile" data-testid={id}>
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
        "fontSize":"14px",
        "margin": "0 0 10px 0"
      }}>{`...${summary.substring(83)}`}</div>

      {reviewBody}

      <div style={{
        "display":"grid",
        "justifyItems": "right"
      }}>
        <Modal images={images}/>
      </div>

      {recommend ? <div style={{
        "margin": "5px 0 5px 0px",
      }}>	&#10003; I recommend this product </div> : null}

      {response ? <div style={{
        "margin": "5px 0 5px 0px",
        "fontSize":"14px",
        "padding": "5px",
        "backgroundColor": "#D3D3D3"
      }}>
        <div style={{"fontWeight": "bold"}}>Response: </div><br></br>
        {response}
      </div> : null}

      <div>
        Helpful? &nbsp;
        <a style={{"textDecoration":"underline"}}>Yes</a>
        {` (${helpfulness})`}
        &nbsp; &nbsp; | &nbsp; &nbsp;
        <a style={{"textDecoration":"underline"}}>Report</a>
      </div>
    </div>
  )
}

export default ReviewTile;