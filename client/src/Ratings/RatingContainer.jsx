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
      reviews: [],
      shownReviews: 2
    };
    this.productId = this.props.productId
  }

  addReview() {
    if (this.state.reviews.length - this.state.shownReviews > 1) {
      this.setState({
        shownReviews: this.state.shownReviews + 2
      })
    } else {
      this.setState({
        shownReviews: this.state.shownReviews + 1
      })
    }
  }

  sortAndGet(page, sort) {
    $.ajax({
      method: "GET",
      url: "/reviews",
      data: {
        page,
        sort,
        product_id: this.productId
      },
      contentType: "application/json",
      success: data => {
        var reviews = JSON.parse(data).results;
        var shownReviews = reviews.length < 2 ? reviews.length : 2
        this.setState({
          reviews,
          shownReviews
        })
      }
    })
  }

  componentDidMount() {
    this.sortAndGet(0, "relevant")
  }

  render() {
    return (
      <div className="ReviewBox" data-testid="container">
        <h4>Ratings/Review Container</h4>
        <ReviewsList
          reviews={this.state.reviews}
          shownReviews={this.state.shownReviews}
          addReview={this.addReview.bind(this)}
        />
        <AddReview/>
        <SortReviews/>
        <RatingBreakdown/>
        <ProductBreakdown/>
      </div>
    )
  }
}

export default RatingContainer;