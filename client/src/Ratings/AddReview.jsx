import React from "react";
import { useState } from "react";
import NewReview from "./NewReview.jsx";
import $ from "jquery";
import getClicks from "../getClicks.jsx";

var AddReviews = ({
  clicked,
  productName,
  charMap,
  product,
  characteristics,
  product_id,
  submitReview,
  writing,
  setWriting,
  display,
  setDisplay,
}) => {
  // var [display, setDisplay] = useState("none");

  //Will load relevant characteristics from API
  var chars =
    !characteristics ||
    Object.keys(characteristics).map((attr) => [
      attr,
      characteristics[attr].id,
    ]);

  var refreshModal = (e) => {
    e.stopPropagation();
    $("#error").remove();
    setDisplay("none");
  };

  return (
    <button
      className="RatingBtn"
      onClick={(e) => {
        clicked(e);
        setDisplay("block");
        setWriting(true);
      }}
      data-testid="addReview"
    >
      Add A Review
      <div className="modal" style={{ display }} id="newModal">
        <div className="writing-modal" data-testid="writing-modal">
          <span
            className="close"
            style={{ alignSelf: "flex-end" }}
            onClick={(e) => {
              refreshModal(e);
              setWriting(false);
            }}
          >
            &times;
          </span>
          <div>
            <NewReview
              productName={productName}
              charMap={charMap}
              chars={chars}
              product={product}
              product_id={product_id}
              submitReview={submitReview}
              refreshModal={refreshModal}
              writing={writing}
            />
          </div>
        </div>
      </div>
    </button>
  );
};

export default getClicks(AddReviews);
