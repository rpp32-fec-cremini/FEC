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

    this.grabStyle =  this.grabStyle.bind(this);
  }





  render() {
    if (!this.state.currentImage) {
      return (

        <div>
          <h1>Boooo, no image here</h1>
        </div>

      )
    } else {
      return (

      <div>
        <h2 className = 'related relatedCard'>IMAGE GALLERY</h2>
        <img src={this.state.currentImage} style = {{height: '500px', width: '500px'}} ></img>
      </div>

    )}
  }
}

export default ImageGallery;