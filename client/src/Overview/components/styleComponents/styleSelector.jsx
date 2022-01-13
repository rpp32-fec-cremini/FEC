import React from 'react';
import ReactDOM from 'react-dom';
import Style from './style.jsx';
import $ from 'jquery';


const StyleSelector = (props) => {

    if(!props) {
      return (
        <div>
          <h1>NO DATA HERE NANANANANAN BATMAN</h1>
        </div>
      )
    } else {
      //console.log('Where props? ', this.props)
    return (
      <div>
         <h4 data-testid = 'style' style = {{'font': 'bold'}}>Available Styles</h4>
        <h3>{props.currentStyle.name}</h3>
      <div className = 'grid-4-style'>

        {props.styleList.map((style) =>
          <Style onClick = {() => props.changeStyle(style)}
            name={style.name}
            pic = {style.photos[0].thumbnail_url}
            key ={style.style_id}
            height = {'30px'}
            width={'30px'}
            class = {'galleryThumbnail'}
          />
    )}
      </div>
      </div>
    )
  }
}

export default StyleSelector;