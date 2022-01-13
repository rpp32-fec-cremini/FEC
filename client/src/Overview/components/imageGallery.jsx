import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import GalleryList from './galleryList.jsx'

const ImageGallery =(props) => {

    var imgSrc = props.currentUrl.photos?.length && props.currentUrl.photos[0].url
    if (!props) {
      return (

        <div>
          <h1>Boooo, no image here</h1>
        </div>

      )
    } else {

      return (
      <div style = {{padding: '0px 100px 0px 50px'}}>
      <div style={{ backgroundImage: `url(${imgSrc})`}} className = 'imageGallery' >
      <br></br>
      </div>
      <GalleryList changeImageGallery = {props.changeImageGallery} currentStyle = {props.currentStyle} styleList={props.styleList} />
      </div>

    )}
}

export default ImageGallery;