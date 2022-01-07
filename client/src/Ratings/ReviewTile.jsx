import React from "react";
import $ from "jquery";
import getClicks from "../getClicks.jsx";

import ImageModal from "./ImageModal.jsx"

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


var ReviewTile = ({id, starRating, dateWritten, summary, body, images, recommend, name, response, helpfulness, addToVoted, voted}) => {
  var boldSummary = summary.length > 83 ? `${summary.substring(0,83)}...` : summary;
  var extraSummary = summary.length > 83 ? <div>{`...${summary.substring(83)}`}</div> : null;
  if (body.split(" ").length > 250) {
    var reviewBody = <div>
      <div className="collapsedBody expandedBody" id={`body${id}`}>{`${body.split(" ").slice(0,250).join(" ")}...`}</div>
      <a
        id={`link${id}`}
        onClick={(e) => {
          $(`#body${id}`).html(body)
          $(`#body${id}`).removeClass("collapsedBody")
          $(`#link${id}`).remove()
        }}
    >Show More</a>
    </div>
  } else {
    var reviewBody = <div className="expandedBody">{body}</div>
  }

  var voted = id in voted ? helpfulness + 1 : helpfulness

  return (
    <div className="ReviewTile" data-testid={id}>

      <div style={{"display":"grid", "gridTemplateColumns":"1fr 3fr 1fr", "margin": "10px"
      }}>
        <StarRating rating={starRating} />
        <div style={{"gridColumnStart":"4"}}>{`${name}, ${dateWritten}`}</div>
      </div>

      <div style={{"fontWeight":"bold"}}>{boldSummary}</div>
      {extraSummary}

      {reviewBody}

      <div style={{"display":"grid", "justifyItems": "right"}}>
        <ImageModal images={images}/>
      </div>

      {recommend ? <div style={{"margin": "5px 0 5px 0px"}}>&#10003; I recommend this product </div> : null}

      {response ? <div className="response">
        <div style={{"fontWeight":"bold"}}>Response: </div><br></br>
        {response}
      </div> : null}

      <div style={{"padding":"4px 0 0 0"}}>
        Helpful? &nbsp;
        <a style={{"textDecoration":"underline"}} onClick={() => {
          addToVoted(id, 'helpful')
        }}>Yes</a>
        {` (${voted})`}
        &nbsp; &nbsp; | &nbsp; &nbsp;
        <a style={{"textDecoration":"underline"}} onClick={() => {
          addToVoted(id, 'report')
        }}>Report</a>
      </div>
    </div>
  )
}

export default getClicks(ReviewTile);