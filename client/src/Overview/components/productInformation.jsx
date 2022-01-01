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
      productMeta: {}

    }

    this.getProducts = this.getProducts.bind(this);

  }


  componentDidMount() {

    this.getProducts();

  }

  getProducts = () => {

    console.log('IT RUNNETH');
    $.ajax({
      type: "GET",
      url: 'overview/products',
      success: data => {

        this.setState({productList: data, current: data[0]});
      }
    })
  }




  render() {

    var product = this.state.current.name;
    var desc = this.state.current.description;
    var category = this.state.current.category;
    var price = this.state.current.default_price;
    var id = this.state.current.id;
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
      <div className = "flexContainer">
        <ImageGallery className='flexItem' product_id = {this.state.current.id} />
      </div> <br></br>
          <h3>{category} ::: {product} <ProductRating product_id = {this.state.current.id}/></h3>
          <h3>{price}</h3>
          <h4>{desc}</h4>
      <StyleSelector product_id = {this.state.current.id} />
      </div>

    )}
  }
}

export default ProductInfo;