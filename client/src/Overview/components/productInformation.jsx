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
/*
  componentDidUpdate() {
    console.log('Here be your props ', this.props)
    if(this.props.current === {}) {
      this.props.getProducts;
    }
  } */


  /* componentDidUpdate(prevProps) {
    if(prevProps !== this.props) {
      this.props.getProducts;
      /* this.setState({
        productList: this.props.productList,
        reviewMeta: this.props.reviewMeta
      }); */
   // }
  //}

 /*  componentDidUpdate() {
    if(!this.state.currentStyle) {
      this.getCurrentStyle();
    }
  } */

 /*  getProducts = () => {

    $.ajax({
      type: "GET",
      url: 'overview/products',
      success: data => {
        this.setState({productList: data, current: data[0]});
        this.getCurrentStyle();
      }
    })

  } */

 /*  getStyles = () => {
    $.ajax({
      type: "GET",
      url: `overview/products/${this.props.product_id}/styles`,
      success: products => {
        //console.log('STYLE Data is here! ', products);
        this.setState({styleList: products.results, currentStyle: products.results[0]});
        //console.log('STYLE STATE HERE ', this.state);
      }
    })
  }



  getCurrentStyle = () => {
    $.ajax({
      type: "GET",
      url: `overview/products/${this.state.current.id}/styles`,
      success: products => {
        //console.log('STYLE Data is here! ', products);
        for (var i = 0; i < products.results.length; i++) {
          if(products.results[i]['default?'] === true) {
            this.setState({currentStyle: products.results[i]})
          }
        }
        //this.setState({currentStyle: product.results.style_id});
        console.log('STYLE STATE HERE ', this.state);
      }
    })
  }

  getMetadata = (id) => {


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



  render() {
    var product = this.props.current.name;
    var desc = this.props.current.description;
    var category = this.props.current.category;
    var price = this.props.current.default_price;
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
            <h3>{price}</h3>
            <h4>{desc}</h4>
        </div>

      )}
    }
}

export default ProductInfo;