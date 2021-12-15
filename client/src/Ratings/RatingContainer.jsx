import React from "react";
import $ from "jquery";

import ReviewsList from "./ReviewsList.jsx";
import AddReview from "./AddReview.jsx";
import SortReviews from "./SortReviews.jsx";
import RatingBreakdown from "./RatingBreakdown.jsx";
import ProductBreakdown from "./ProductBreakdown.jsx";

class RatingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    }
  }

  sortAndGet() {
    $.get("/reviews", data => {
      var reviews = JSON.parse(data).results;
      this.setState({
        reviews
      })
    })
  }

  componentDidMount() {
    this.sortAndGet()
  }

  render() {
    return (
      <div className="ReviewBox" data-testid="container">
        <h4>Ratings/Review Container</h4>
        <ReviewsList reviews={this.state.reviews}/>
        <AddReview/>
        <SortReviews/>
        <RatingBreakdown/>
        <ProductBreakdown/>
      </div>
    )
  }
}

export default RatingContainer;