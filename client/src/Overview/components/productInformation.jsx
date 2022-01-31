import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import StyleSelector from './styleComponents/styleSelector.jsx';
import ImageGallery from './imageGallery.jsx'
import ProductRating from './productRating.jsx'
import AddToCart from './cartComponents/addToCart.jsx';


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
      return(

        <div style={{padding:'10px 10px 10px 10px'}}>
            <h2 data-testid = 'product'>{product}<br></br>
            <b style ={{fontStyle: 'italic', 'fontSize': '14px'}}>{category}</b>

            <br></br>

            <ProductRating reviewMeta={props.reviewMeta} /><a href = '#container' style ={{'fontSize': '14px'}}>Read all reviews</a></h2>

            <b data-testid = "price">{price}</b>

            <h6 data-testid = "desc">{desc}</h6>

            <StyleSelector className=' grid-4-style' styleList={props.styleList} currentStyle = {props.currentStyle} changeStyle = {props.changeStyle} data-testid = 'styleSelectorr' />

            <br></br>
            <br></br>
            <br></br>

            <AddToCart currentStyle = {props.currentStyle} data-testid = 'cart' />


        </div>

      )}
  }

export default ProductInfo;