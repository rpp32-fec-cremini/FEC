import React from "react";
import $ from "jquery";

import ReviewsList from "./ReviewsList.jsx";
import RatingBreakdown from "./RatingBreakdown.jsx";
import ProductBreakdown from "./ProductBreakdown.jsx";
import "./Ratings.css";

class RatingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      shownReviews: 2,
      voted: {},
      product: "",
      meta: {}
    };
    this.productId = this.props.productId
  }

  addToVoted(id) {
    this.setState({
      voted: {...this.state.voted, [id]: true}
    })
    //replace this later on with put request to server
  }


  moreReviews() {
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
        var product = JSON.parse(data).product
        var reviews = JSON.parse(data).results;
        var shownReviews = reviews.length < 2 ? reviews.length : 2
        $.ajax({
          method: "GET",
          url: "/reviews/meta",
          data: {
            product_id: this.productId
          },
          contentType: "application/json",
          success: data => {
            var meta = JSON.parse(data);
            this.setState({
              reviews,
              shownReviews,
              product,
              meta
            })
          }
        })

      }
    })
  }

  componentDidMount() {
    this.sortAndGet(1, "relevant")
  }

  render() {
    return (
      <div className="container">
        <div className="container-left">
          <RatingBreakdown/>
          <ProductBreakdown/>
        </div>
        <ReviewsList
          reviews={this.state.reviews}
          shownReviews={this.state.shownReviews}
          moreReviews={this.moreReviews.bind(this)}
          addToVoted={this.addToVoted.bind(this)}
          voted={this.state.voted}
          product={this.state.product}
          characteristics={this.state.meta.characteristics}
        />
      </div>
    )
  }
}

export default RatingContainer;