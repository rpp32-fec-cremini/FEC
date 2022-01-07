import React from "react";
import $ from "jquery";

import ReviewsList from "./ReviewsList.jsx";
import RatingBreakdown from "./RatingBreakdown.jsx";
import ProductBreakdown from "./ProductBreakdown.jsx";
import "./Ratings.css";
import getClicks from "../getClicks.jsx";

class RatingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      shownReviews: 2,
      voted: {},
      reported: {},
      product: "",
      meta: {},
      filters: [],
      productName: ''
    };
    this.productId = this.props.productId;
    this.charMap = {
      Size: ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too wide'],
      Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
      Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
      Quality: ['Poor', 'Below Average', 'What I expected', 'Pretty great', 'Perfect'],
      Length: ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
      Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
    }
  }

  changeFilter(filter) {
    if (filter === 'removeAll') {
      this.setState({filters: []})
    } else {
      if (filter === '') return;
      var filters = [...this.state.filters];
      if (filters.includes(filter)) {
        filters.splice(filters.indexOf(filter), 1)
      } else {
        filters.push(filter)
      }
      this.setState({
        filters
      })
    }
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
            $.ajax({
              method: "GET",
              url: `/products/${this.productId}`,
              contentType: "application/json",
              success: data => {
                var productName = JSON.parse(data).name
                this.setState({
                  reviews,
                  shownReviews,
                  product,
                  meta,
                  productName
                })
              }
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
    if (!this.state.filters.length) {
      var filteredReviews = [...this.state.reviews];
    } else {
      var filteredReviews = this.state.reviews.filter(review => this.state.filters.includes('bar' + review.rating));
    }

    //metadata doesnt match actual data
    return (
      <div className="container" onClick={(e) => this.props.clicked(e)}>
        <div className="container-left">
          <RatingBreakdown meta={this.state.meta} changeFilter={this.changeFilter.bind(this)} filters={this.state.filters}/>
          <ProductBreakdown characteristics={this.state.meta.characteristics} charMap={this.charMap}/>
        </div>
        <ReviewsList
          sortAndGet={this.sortAndGet.bind(this)}
          reviews={filteredReviews}
          shownReviews={this.state.shownReviews}
          moreReviews={this.moreReviews.bind(this)}
          addToVoted={this.addToVoted.bind(this)}
          voted={this.state.voted}
          product={this.state.product}
          characteristics={this.state.meta.characteristics}
          product_id={this.productId}
          submitReview={this.submitReview.bind(this)}
          charMap={this.charMap}
          productName={this.state.productName}
        />
      </div>
    )
  }
}

export default getClicks(RatingContainer);