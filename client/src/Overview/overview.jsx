import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import $ from 'jquery';

import ProductInfo from './components/productInformation.jsx';
import StyleSelector from './components/styleComponents/styleSelector.jsx';
import ImageGallery from './components/imageGallery.jsx';
import AddToCart from './components/cartComponents/addToCart.jsx';

//  //URL FOR API
const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      current: {},
      styleList: [],
      currentStyle: {},
      reviewMeta: {},

    }

    this.getProducts = this.getProducts.bind(this);
    this.getStyles = this.getStyles.bind(this);
    this.getMetadata = this.getMetadata.bind(this);
    this.runAll = this.runAll.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts = () => {
    axios.get('overview/products')
    .then(response => {
      let data = response.data
      this.setState({productList: data, current: data[0]})
      console.log('Parent state! ', this.state);
    })
    .catch(error => {
      console.log(error)
    })
  }




  /* getProducts = () => {
    $.ajax({
      type: "GET",
      url: 'overview/products',
      success: data => {
        this.setState({productList: data, current: data[0]});
        console.log('Parent state! ', this.state)
      }
    })
  } */

  getStyles = () => {
    axios.get(`overview/products/${this.state.current.id}/styles`)
    .then(products => {
        //console.log('STYLE Data is here! ', products);
        let data = products.data
        this.setState({styleList: products.results, currentStyle: products.results[0]});
        //console.log('STYLE STATE HERE ', this.state);
      })
      .catch(error =>{
        console.log(error)
      })
  }

  getMetadata = () => {
      axios.get(`overview/reviews/meta/`, {params: {product_id: this.state.current.id}})
      .then(response => {
        let data = response.data
        this.setState({reviewMeta: data.ratings});
      })
      .catch(error => {
        console.log(error);
      })


        //this.makeRatings();

  }

  runAll = () => {
    this.getProducts();
    this.getMetadata();
    this.getStyles();
  }


  render() {
    if (!this.state.current) {
      return (

        <div>
          <div className = 'related relatedCard'>
            Aint no data here. Don't see shit, capn
          </div>
        </div>

      )
    } else {
      return (
      <div>
        <div className='related relatedContainer'>
        {/* <ImageGallery className=' related relatedCard ' data={}   /> */}
        <ProductInfo className=' related relatedCard' productList={this.state.productList} styleList ={this.state.styleList} reviewMeta= {this.state.reviewMeta} current={this.state.current}/>
        {/* <AddToCart /> */}
        <br></br>
      </div>
      {/* <StyleSelector className=' related relatedCard' data={}  /> */}
      </div>
    );}
  }
}

export default Overview;