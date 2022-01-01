import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class ProductRating extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      reviewMeta: {}
    }
  }

  getMetadata = (id) => {

    console.log('Metadata acquired');

    $.ajax({

      type: 'GET',
      url: `/reviews/meta/`,
      data: {product_id: id},
      success: data => {

        console.log('Data not coming up? ', data)
        this.setState({productMeta: data})

      }
    })

  }

  render() {

    return (

      <div>
        <h5>Rating here: * * * * * </h5>
      </div>

    )
  }
}

export default ProductRating;