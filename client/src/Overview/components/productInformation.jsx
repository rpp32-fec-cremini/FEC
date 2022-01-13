import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import StyleSelector from './styleComponents/styleSelector.jsx';
import ImageGallery from './imageGallery.jsx'
import ProductRating from './productRating.jsx'


const ProductInfo = (props) => {

    var product = props.current.name;
    var desc = props.current.description;
    var category = props.current.category;
    var price =  !props.currentStyle.sale_price ? <div>{props.currentStyle.original_price}</div> : <div><b style = {{color: 'red'}}>{props.currentStyle.sale_price}</b> <b style = {{'textDecorationLine': 'line-through'}}>{props.currentStyle.original_price}</b></div>;
    var id = props.current.id;

    if (!props) {
      return (

        <div>
          <div className = 'related relatedCard'>
            Aint no data here. Don't see shit, capn
          </div>
        </div>

      )
    } else{
      console.log('What are the props being passed down? ', props)

      //className = 'struckThru'
      return(

        <div>
            <h2>{product}<br></br>
            <b style ={{fontStyle: 'italic', 'fontSize': '14px'}}>{category}</b>
            <br></br>
            <ProductRating reviewMeta={props.reviewMeta} /><a href = '#container' style ={{'fontSize': '14px'}}>Read all reviews</a></h2>
            <b>{price}</b>

            <h6>{desc}</h6>
            {/* <br></br> */}
            <StyleSelector className=' grid-4-style' styleList={props.styleList} currentStyle = {props.currentStyle} changeStyle = {props.changeStyle} />


        </div>

      )}
  }

export default ProductInfo;