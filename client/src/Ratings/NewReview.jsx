import React from 'react';
import { useState } from "react";
import $ from "jquery";

var Stars = (props) => {
  var ratings = {
    0: "Poor",
    1: "Fair",
    2: "Average",
    3: "Good",
    4: "Great",
  }
  return (
    <div id="stars" style={{"width": "20px"}}>
      {[...Array(5)].map((star,i) => <span key={i} id={i} className="emptyStar" onClick={(e) => {
        e.stopPropagation()
        var id = e.target.id;
        for (var i = 0; i <= id; i++) {
          $(`#${i}`).removeClass("emptyStar").addClass("filledStar")
        }
        for (var i = parseInt(id) + 1; i <= 5; i++) {
          $(`#${i}`).removeClass("filledStar").addClass("emptyStar")
        }
        $(".hello").remove()
        $("#stars").append(`<span class="hello">${ratings[id]}</span>`)
      }}>&#9733;</span>)}
    </div>
  )
}

var NewReview = (props) => {
  return <div>
    <label>Overall rating: <Stars/></label>
    <label>Do you recommend this product?</label>
    <input type="radio" id="recommended" name="recommended"/>
    <label>Yes</label>
    <input type="radio" id="notrecommended" name="recommended"/>
    <label>No</label>
  </div>
}

export default NewReview;