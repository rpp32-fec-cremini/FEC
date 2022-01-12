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
      currentPhotoUrl: {
        photos: [{url: 'yeah whatever'}]
      }

    }
    this.changeStyle = this.changeStyle.bind(this);
  }

  changeStyle(style) {
    if (style !== this.state.currentStyle) {
    this.setState({currentStyle: style})
    console.log('Here\'s what the state looks like now ', this.state.currentStyle)
    }
    console.log('BEHOLD, THE CLICKED STYLE! ', style)
  }

  componentDidMount() {
    return axios.get('overview/products')
    .then(response => {
      let data = response.data;

      //Styles API Call
      return axios.get(`overview/products/${data[0].id}/styles`)
        .then((styles) => {
          let stylish = styles.data
          console.log('WE GOT STYLE ', stylish)

          //Metadata API Call
            return axios.get(`overview/reviews/meta/`, {params: {product_id: data[0].id}})
              .then(meta => {
              let metaData = meta.data
              //this.setState({reviewMeta: data.ratings});
              //console.log('OSHIT ITS METAKNIGHT ', metaData)

              this.setState({
                productList: data,
                current: data[0],
                styleList: stylish.results,
                currentStyle: stylish.results[0],
                reviewMeta: metaData,
                currentPhotoUrl: stylish.results[0]
              },
                ()=>{ //callback function to verify everything done
                  console.log('Muahahahah done');
              })

              console.log('BEHOLD, THIS FRANKENSTEIN OF A STATE ', this.state)
            })
              .catch(error => { //error block for metadata call
                console.log(error);
              })
        })
        .catch(error => { //error block for style call
          console.log(error);
        })
      })
      .then(error => { //error block for productList call
        console.log(error);
      })
  }

 /*  selectStyle() {

  }
 */

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
        <div className='related relatedContainer' style={{margin: 'auto', width:'90%', padding: '10px'}}>
        <ImageGallery className=' related relatedCard '  currentUrl={this.state.currentPhotoUrl}   />

        <ProductInfo className=' related relatedCard' productList={this.state.productList} styleList ={this.state.styleList} reviewMeta= {this.state.reviewMeta} current={this.state.current} currentStyle ={this.state.currentStyle}/>

        <StyleSelector className=' grid-4-style' styleList={this.state.styleList} currentStyle = {this.state.currentStyle} changeStyle = {this.changeStyle} />

        {/* <AddToCart /> */}
        <br></br>
      </div>
      </div>
    );
  }
}}

export default Overview;