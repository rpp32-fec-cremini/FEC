import React from 'react';
import ReactDOM from 'react-dom';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: '',
      imageList: []
    }
  }


  render() {
    return (
      <div>
        <h2>IMAGE GALAREE</h2>
      </div>
    )
  }
}

export default ImageGallery;