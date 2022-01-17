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
      current: {},
      styleList: [],
      currentStyle: {},
      reviewMeta: {},
      currentPhotoUrl: {
        photos: [{url: 'yeah whatever'}]
      },
      cartItem:
        {
         currentSize: '',
         currentQuantity: ''
        }
      }
      this.changeStyle = this.changeStyle.bind(this);
      this.changeImageGallery = this.changeImageGallery.bind(this);

    }

 /*  componentDidUpdate(prevProps) {
    if(prevProps !== this.props) {
      this.setState
    }
  } */

  // const [style', changeStyle ] = useState('Blue')
  //changeStyle ('red')
  //onClick = {changeStyle(e.target.value)}

  changeStyle(style) {
    if (style !== this.state.currentStyle) {
      this.setState({currentStyle: style})
    }
  }

  selectSizeQuantity(size, quantity) {
    if ({size, quantity} !== this.state.cartItem) {
      this.setState({cartItem: {currentSize: size, currentQuantity: quantity}})
    }
  }

  changeImageGallery(style) {
    if (style.photos !== this.state.currentPhotoUrl.photos) {
        this.setState({currentPhotoUrl: {photos: style.photos}})
      }
      console.log('BEHOLD, THE CLICKED STYLE! ', style.photos)
  }

  componentDidMount() {
    return axios.get(`/products/${this.props.productId}`)
    .then(response => {
      let data = response.data;

      //Styles API Call
      return axios.get(`overview/products/${this.props.productId}/styles`)
        .then((styles) => {
          let stylish = styles.data
          console.log('Checking data structure for style ', stylish)

          //Metadata API Call
            return axios.get(`overview/reviews/meta/`, {params: {product_id: this.props.productId}})
              .then(meta => {
              let metaData = meta.data

              this.setState({
                current: data,
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
          <div /* className = 'related relatedCard' */>
            Aint no data here. Don't see shit, capn
          </div>
        </div>

      )
    } else {
      return (
      <div>
        <div /* className='related relatedContainer' */ style={{margin: 'auto', width:'90%', padding: '10px', display: 'flex'}}>
        <ImageGallery className=' related relatedCard '
          currentUrl={this.state.currentPhotoUrl}
          changeImageGallery = {this.changeImageGallery}
          currentStyle = {this.state.currentStyle}
          styleList={this.state.styleList}
        />

        <ProductInfo className=' related relatedCard'
         productList={this.state.productList}
         styleList ={this.state.styleList}
         reviewMeta= {this.state.reviewMeta}
         current={this.state.current}
         currentStyle ={this.state.currentStyle}
         changeStyle = {this.changeStyle}
        />
        <br></br>

      </div>
      {/* <AddToCart /> */}
      </div>
    );
  }
}}

export default Overview;