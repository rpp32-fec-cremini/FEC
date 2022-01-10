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
    this.getCurrentStyle = this.getC urrentStyle.bind(this); */

  }



  render() {
    var product = this.props.current.name;
    var desc = this.props.current.description;
    var category = this.props.current.category;
    var price =  !this.props.currentStyle.sale_price ? <div>{this.props.currentStyle.original_price}</div> : <div><b style = {{color: 'red'}}>{this.props.currentStyle.sale_price}</b> <b style = {{'text-decoration': 'line-through'}}>{this.props.currentStyle.original_price}</b></div>;
    var id = this.props.current.id;
    /* console.log('Props??', this.props)
    console.log('BEHOLD, THE ID ', id); */

    if (!this.state.current) {
      return (

        <div>
          <div className = 'related relatedCard'>
            Aint no data here. Don't see shit, capn
          </div>
        </div>

      )
    } else{

      //className = 'struckThru'
      return(

        <div>
            <h3>{category} ::: {product} <ProductRating reviewMeta={this.props.reviewMeta} /><a href = '#container' style ={{'font-size': '12px'}}>Read all reviews</a></h3>
            <b>{price}</b>
            <h4>{desc}</h4>
        </div>

      )}
    }
}

export default ProductInfo;