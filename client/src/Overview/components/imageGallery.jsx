import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import GalleryList from './galleryList.jsx';
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from 'react-icons/bs';

const ImageGallery =(props) => {
    const [index, changeIndex] = useState(0);

    if (!props) {
      return (

        <div>
          <h1>Boooo, no image here</h1>
        </div>

      )
    } else {
      //console.log('Checking props here ', props)
      var imgSrc = props.currentUrl.photos?.length && props.currentUrl.photos[0].url
      return (
      <div><BsArrowLeftCircleFill onClick={() => changeIndex(index + 1)} style ={{display: 'flex'}}/>
      <div style = {{padding: '0px 100px 0px 50px', backgroundColor: '#efeff5' }}>
      <div style={{ backgroundImage: `url(${imgSrc})`, cursor: 'zoom-in'}} className = 'imageGallery' data-testid = "galleryList" >
      <GalleryList changeImageGallery = {props.changeImageGallery} currentStyle = {props.currentStyle} styleList={props.styleList} />
      <br></br>
      </div>
      {/* <GalleryList changeImageGallery = {props.changeImageGallery} currentStyle = {props.currentStyle} styleList={props.styleList} /> */}
      </div>
      <BsArrowRightCircleFill style = {{justifyContent: 'right'}} />
      </div>

    )}
}

export default ImageGallery;