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

    this.search =  this.search.bind(this);
  }

  componentDidMount() {
    this.search();
  }


  search = () => {
    $.ajax({
      type: "GET",
      url: '/overview/styles',
      success: data => {
        //let products = JSON.parse(data)
        this.setState({imageList: data.results[0].photos, currentImage: data.results[0].photos[0].thumbnail_url});
        //console.log('STATE HERE ', this.state);
      }
    })//console.log ('hardee har har, you thought you had me');
  }



  render() {
    return (
      <div>
        <h2 className = 'related relatedCard' /* style = {{height: '100%'}} */>IMAGE GALLERY</h2>
        <img src={this.state.currentImage} ></img>
      </div>
    )
  }
}

export default ImageGallery;