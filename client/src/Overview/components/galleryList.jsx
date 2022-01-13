import React from 'react';
import ReactDOM from 'react-dom';
import Style from './styleComponents/style.jsx';
import $ from 'jquery';


const GalleryList = (props) => {
  if(!props) {
    return (
      <div>
        <h1>NO DATA HERE NANANANANAN BATMAN</h1>
      </div>
    )
  } else {
    return (
      <div style={{height: '100px', width: '100px', position: 'relative'}}>
        <h2 data-testid = 'style'></h2>
      <div style={{
        display: 'grid',
        'grid-template-columns': 'repeat(7, 1fr)',
        bottom: '0'
      }}>
        {props.styleList.map((style) =>
      <Style onClick = {() => props.changeImageGallery(style)}
        name={style.name}
        pic = {style.photos[0].url}
        key ={style.style_id}
        height ={'40px'}
        width={'40px'}
        class = {'galleryThumbnail'} />
  )}
    </div>
    </div>
  )}
}


export default GalleryList;