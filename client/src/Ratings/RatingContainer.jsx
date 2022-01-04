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
      reported: {},
      product: "",
      meta: {}
    };
    this.productId = this.props.productId
  }

  submitReview(data) {
    console.log(data)
    $.ajax({
      method: "POST",
      url: "/reviews",
      data: JSON.stringify(data),
      contentType: "application/json",
      success: response => location.reload()
    })
  }

  postVote(route, id, callback) {
    $.ajax({
      method: "POST",
      url: route,
      data: JSON.stringify({id}),
      contentType: "application/json",
      success: response => callback()
    })
  }

  addToVoted(id, type) {
    if (type === 'helpful') {
      if (!this.state.voted[id]) {
        this.postVote("/reviews/helpful", id, () => {
          this.setState({
            voted: {...this.state.voted, [id]: true}
          })
        });
      }
    } else if (type === 'report') {
      if (!this.state.reported[id]) {
        this.postVote("/reviews/report", id, () => {
          this.setState({
            reported: {...this.state.reported, [id]: true}
          })
        });
      }
    }
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
          <RatingBreakdown meta={this.state.meta}/>
          <ProductBreakdown/>
        </div>
        <ReviewsList
          sortAndGet={this.sortAndGet.bind(this)}
          reviews={this.state.reviews}
          shownReviews={this.state.shownReviews}
          moreReviews={this.moreReviews.bind(this)}
          addToVoted={this.addToVoted.bind(this)}
          voted={this.state.voted}
          product={this.state.product}
          characteristics={this.state.meta.characteristics}
          product_id={this.productId}
          submitReview={this.submitReview.bind(this)}
        />
      </div>
    )
  }
}

export default RatingContainer;