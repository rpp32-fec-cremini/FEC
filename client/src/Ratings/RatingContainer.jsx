import React from "react";

import ReviewsList from "./ReviewsList.jsx";
import AddReview from "./AddReview.jsx";
import SortReviews from "./SortReviews.jsx";
import RatingBreakdown from "./RatingBreakdown.jsx";
import ProductBreakdown from "./ProductBreakdown.jsx";

class ReviewModule extends React.Component {
  render() {
    return (
      <div id="ReviewModule" data-testid="container">
        ReviewModule
        <ReviewsList/>
        <AddReview/>
        <SortReviews/>
        <RatingBreakdown/>
        <ProductBreakdown/>
      </div>
    )
  }
}

export default ReviewModule;