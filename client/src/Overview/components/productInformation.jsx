import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import StyleSelector from './styleComponents/styleSelector.jsx';
import ImageGallery from './imageGallery.jsx'
import ProductRating from './productRating.jsx'


class ProductInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productList: [],
      current: {},
      currentStyle: {},
      productMeta: {}
    }
    /* this.getProducts = this.getProducts.bind(this);
    this.getCurrentStyle = this.getCurrentStyle.bind(this); */

  }



  render() {
    var product = this.props.current.name;
    var desc = this.props.current.description;
    var category = this.props.current.category;
    var price =  !this.props.currentStyle.sale_price ? <div>{this.props.current.default_price}</div> : <div><h3>{this.props.currentStyle.sale_price}</h3> {/* <b style = {{text-decoration: 'line-through'}}>{this.props.current.default_price}</b> */}</div>;
    var id = this.props.current.id;
    console.log('Props??', this.props)
    console.log('BEHOLD, THE ID ', id);

    if (!this.state.current) {
      return (

        <div>
          <div className = 'related relatedCard'>
            Aint no data here. Don't see shit, capn
          </div>
        </div>

      )
    } else {
      return(

        <div>
            <h3>{category} ::: {product} <ProductRating reviewMeta={this.props.reviewMeta} /></h3>
            {price}
            <h4>{desc}</h4>
        </div>

      )}
    }
}

export default ProductInfo;