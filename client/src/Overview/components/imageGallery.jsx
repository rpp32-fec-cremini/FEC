import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import GalleryList from './galleryList.jsx'

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: '',
      imageList: []
    }

  }

  componentDidMount() {
    console.log('ImageGallery ', this.props)
    console.log('Photos? ', this.props.currentUrl)
  }




  render() {

    var imgSrc = this.props.currentUrl.photos?.length && this.props.currentUrl.photos[0].url
    if (!this.props) {
      return (

        <div>
          <h1>Boooo, no image here</h1>
        </div>

      )
    } else {

      return (
      <div style = {{padding: '0px 100px 0px 50px'}}>
      <div style={{
        backgroundImage: `url(${imgSrc})`,
        height: '75vh',
        width: '75vw',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        'border-style': 'double',
        padding: '10px 100px 10px 10px'
      }}>
      <br></br>
      </div>
      <GalleryList changeImageGallery = {this.props.changeImageGallery} currentStyle = {this.props.currentStyle} styleList={this.props.styleList} />
      </div>

    )}
  }
}

export default ImageGallery;