import React from "react";
import { useState } from "react";
import NewReview from "./NewReview.jsx";
import $ from "jquery";
import getClicks from "../getClicks.jsx";

var AddReviews = ({clicked, productName, charMap, product, characteristics, product_id, submitReview}) => {
  var [display, setDisplay] = useState("none")

  //Will load relevant characteristics from API
  var chars = !characteristics || Object.keys(characteristics).map(attr => [attr, characteristics[attr].id]);

  var refreshModal = (e) => {
    e.stopPropagation();
    $("#error").remove();
    setDisplay("none");
  }

  return (
    <button className="RatingBtn" onClick={(e) => {
      clicked(e)
      setDisplay("block")
    }}>Add A Review
      <div className="modal" style={{display}} id="newModal">
        <div className="writing-modal">
          <span className="close" onClick={(e) => {
            refreshModal(e)
          }}>&times;</span>
          <div>
            <NewReview productName={productName} charMap={charMap} chars={chars} product={product} product_id={product_id} submitReview={submitReview} refreshModal={refreshModal}/>
          </div>
        </div>
      </div>
    </button>
  )
}

export default getClicks(AddReviews);

