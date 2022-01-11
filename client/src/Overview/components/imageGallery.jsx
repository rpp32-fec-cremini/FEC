import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

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
      //console.log('Photo render block? ', JSON.stringify(this.props.currentUrl.photos[0]))
      /* console.log('Photo render block?', this.props.currentUrl.photos?.length && this.props.currentUrl.photos[0].url) */


      return (

      <div>
        <h2 className = 'related relatedCard'>IMAGE GALLERY</h2>
        <img src={imgSrc} style = {{height: '500px', width: '500px'}} ></img>
      </div>

    )}
  }
}

export default ImageGallery;