import React from 'react';
import ReactDOM from 'react-dom';
import { IoIosStarHalf, IoIosStarOutline, IoIosStar} from "react-icons/io";
import $ from 'jquery';

class ProductRating extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      reviewMeta: {},
      avgRating: {
        rating: 0,
        stars: []
      },
    }

    this.getMetadata = this.getMetadata.bind(this);
    this.makeRatings = this.makeRatings.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getMetadata(this.props.product_id);
      //this.makeRatings();
    }
  }


  getMetadata = (id) => {


    $.ajax({
      type: 'GET',
      url: `overview/reviews/meta/`,
      data: {product_id: id},
      success: data => {

        this.setState({reviewMeta: data.ratings});
        console.log(this.state)
        this.makeRatings();

      }
    })

  }

  makeRatings = () => {

    var weight = 0;
    var total = 0;
    console.log('DOES THIS FUNCTION EVEN RUN???')

    for (const key in this.state.reviewMeta) {
      console.log('Is this loop even running??');
      var val = parseInt(this.state.reviewMeta[key]);
      weight += (key * val);
      total += val;
    }


    var rating = weight / total;
    this.setState({avgRating : rating})
    console.log('Average rating here! ', rating);
    console.log()

    var rateString = []
    for (var i = rating; i > 0; i--) {
      if (i < 0.5) {
        rateString.push(<IoIosStarOutline key ={i} />)
        break;
      }else if (i >.5 && i < 1) {
        console.log ('HALF STAR BABY')
        rateString.push(<IoIosStarHalf key ={i} />);
      } else {
        rateString.push(<IoIosStar key = {i} />);
      }
    }
    for (var j = rateString.length; j < 5; j++) {
      rateString.push(<IoIosStarOutline key = {j} />)
    }

    console.log(rateString);
    this.setState({stars: rateString})

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