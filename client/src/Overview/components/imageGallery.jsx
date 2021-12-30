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

  componentDidMount() {
    this.grabStyle();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.grabStyle();
    }
  }



  grabStyle = () => {
    $.ajax({
      type: "GET",
      url: `overview/products/${this.props.product_id}/styles`,
      success: data => {
        //let products = JSON.parse(data)
        console.log('IMAGE GALLERY DATA ', data);
        this.setState({
          imageList: data['results'][0]['photos'],
          currentImage: data['results'][0]['photos'][0]['url']
        });
        //console.log('STATE HERE ', this.state);
      }
    })//console.log ('hardee har har, you thought you had me');
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