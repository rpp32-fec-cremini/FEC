import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Style from './styleComponents/style.jsx';
import $ from 'jquery';
import {BsArrowUpCircleFill, BsArrowDownCircleFill, BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';


const GalleryList = (props) => {
  console.log('StyleList here: ', props.styleList);
  const [arr, valueSet] = useState({start: 0, end: 7})

  let current = (props.styleList.length >= 7) ? props.styleList.slice(arr.start, arr.end) : props.styleList;

  function downClick () {
    valueSet({start: start + 1, end: end + 1})
  }

  function upClick () {
    valueSet({start: start - 1, end: end - 1})
  }

  if(!props && !currentList) {
    return (
      <div>
        <h1>NO DATA HERE NANANANANAN BATMAN</h1>
      </div>
    )
  } else {
    //console.log('CURRENT SHOULD ALWAYS BE 7 OR UNDER', current)

    return (
      <div style={{height: '100px', width: '100px', position: 'relative'}}>
        <h2 data-testid = 'style'></h2>
      <div style={{

        display: 'grid',
        'grid-template-columns': 'repeat(1, 1fr)',
        bottom: '0',
        cursor: 'pointer'

      }}>
        <BsArrowUpCircleFill onClick = {upClick}/>
        {current.map((style) =>
      <Style onClick = {() => props.changeImageGallery(style)}
        name={style.name}
        pic = {style.photos[0].url}
        key ={style.style_id}
        height ={'40px'}
        width={'40px'}
        class = {'galleryThumbnail'}
         />
        )}
        <BsArrowDownCircleFill onClick={downClick} />
    </div>
    </div>
  )}
}


export default GalleryList;