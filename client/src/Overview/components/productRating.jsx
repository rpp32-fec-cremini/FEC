import React from 'react';
import ReactDOM from 'react-dom';
import { IoIosStarHalf, IoIosStarOutline, IoIosStar} from "react-icons/io";
import $ from 'jquery';

class ProductRating extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      reviewMeta: {},
      stars: []
    }

    //this.getMetadata = this.getMetadata.bind(this);
    this.makeRatings = this.makeRatings.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.makeRatings();
    }
  }


  /* getMetadata = (id) => {


    $.ajax({
      type: 'GET',
      url: `overview/reviews/meta/`,
      data: {product_id: id},
      success: data => {

        this.setState({reviewMeta: data.ratings});
        this.makeRatings();

      }
    })

  } */

  makeRatings = () => {

    var weight = 0;
    var total = 0;

    for (const key in this.props.reviewMeta) {
      var val = parseInt(this.props.reviewMeta[key]);
      weight += (parseInt(key) * val);
      total += val;
    }


    var rating = weight / total;
    console.log('Average rating here! ', rating);

    var rateString = []
    for (var i = rating; i > 0; i--) {
      if (i < 0.5) {
        rateString.push(<IoIosStarOutline key ={i} />)
        break;
      }else if (i >.5 && i < 1) {
        rateString.push(<IoIosStarHalf key ={i} />);
      } else {
        rateString.push(<IoIosStar key = {i} />);
      }
    }
    for (var j = rateString.length; j < 5; j++) {
      rateString.push(<IoIosStarOutline key = {j} />)
    }

    this.setState({stars: rateString})
    console.log(this.state.stars)

  }


  render() {

    return (
      <div>
        <h5>{this.state.stars} </h5>
      </div>

    )
  }
}

export default ProductRating;