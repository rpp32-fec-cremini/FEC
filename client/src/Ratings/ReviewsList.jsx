import { data } from "jquery";
import React from "react";
import { useState } from "react";
import ReviewTile from "./ReviewTile.jsx";
import AddReview from "./AddReview.jsx";
import SortReviews from "./SortReviews.jsx";
import getClicks from "../getClicks.jsx";

var ReviewsList = ({
  clicked,
  reported,
  productName,
  charMap,
  sortAndGet,
  reviews,
  shownReviews,
  moreReviews,
  addToVoted,
  voted,
  product,
  characteristics,
  product_id,
  submitReview,
  writing,
  setWriting,
  display,
  setDisplay,
}) => {
  var addBtn =
    reviews.length && shownReviews != reviews.length ? (
      <button className="RatingBtn" onClick={moreReviews} data-testid="more">
        + More Reviews
      </button>
    ) : null;
  var sortDropdown = reviews.length ? (
    <SortReviews numReviews={reviews.length} sortAndGet={sortAndGet} />
  ) : null;
  return (
    <div className="container-right" onClick={(e) => clicked(e)}>
      {sortDropdown}
      <div className="scrollStyle" data-testid="scrolllist">
        {reviews.slice(0, shownReviews).map((review) => {
          var flagColor = reported[review.review_id] ? "red" : "grey";
          return (
            <ReviewTile
              id={review.review_id}
              key={review.review_id}
              starRating={review.rating}
              dateWritten={conformDate(review.date)}
              summary={review.summary}
              body={review.body}
              images={review.photos}
              recommend={review.recommend}
              name={review.reviewer_name}
              response={review.response}
              helpfulness={review.helpfulness}
              addToVoted={addToVoted}
              voted={voted}
              flagColor={flagColor}
            />
          );
        })}
      </div>
      <div className="buttons">
        {addBtn}
        <AddReview
          productName={productName}
          charMap={charMap}
          product={product}
          characteristics={characteristics}
          product_id={product_id}
          submitReview={submitReview}
          writing={writing}
          setWriting={setWriting}
          display={display}
          setDisplay={setDisplay}
        />
      </div>
    </div>
  );
};

var conformDate = (date) => {
  var months = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    10: "October",
    11: "November",
    12: "December",
  };
  var d = date.substring(0, 10);
  var [year, month, day] = d.split("-");
  return `${months[month]} ${day[0] !== 0 ? day : day[1]}, ${year}`;
};

export default getClicks(ReviewsList);
