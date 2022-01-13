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


  makeRatings = () => {

    var weight = 0;
    var total = 0;

    ////BLOCK TO CALCULATE AVERAGE RATING///////////////////
    for (const key in this.props.reviewMeta.ratings) {
      var intKey = Number(key);
      var val = Number(this.props.reviewMeta.ratings[key]);
      weight = weight + (intKey * val);
      total = total + val;
    }

    var rating = weight / total;
    ///END AVERAGE RATING BLOCK/////////////////////////////

    var rateString = []

    ///BLOCK TO BUILD RATING COMPONENTS////////////////////
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
    ///////////////////////////////////////

    this.setState({stars: rateString})

  }


  render() {

    return (
      <b style={{fontSize: '14px'}}>{this.state.stars} </b>


    )
  }
}

export default ProductRating;