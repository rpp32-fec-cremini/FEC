import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import StyleSelector from './styleComponents/styleSelector.jsx';
import ImageGallery from './imageGallery.jsx'


class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      current: {}
    }
    this.search = this.search.bind(this);
  }


  componentDidMount() {
    console.log('Gobble gobble');
    this.search();
  }


  search = () => {
    console.log('IT RUNNETH');
    $.ajax({
      type: "GET",
      url: 'overview/products',
      success: data => {
        //let products = JSON.parse(data)
        //console.log('DAAAATA', data);
        this.setState({productList: data, current: data[0]});
        console.log('STATE HERE ', this.state);
      }
    })//console.log ('hardee har har, you thought you had me');
  }




  render() {
    var product = this.state.current.name;
    var desc = this.state.current.description;
    var category = this.state.current.category;
    var price = this.state.current.default_price;
    var id = this.state.current.id;
    //console.log('BEHOLD, THE ID ', id);
    //console.log('STATE HERE', this.state)
    if (!this.state.current) {
      return (
        <div>
          <div className = 'related relatedCard'>
            Aint no data here. Don't see shit, capn
          </div>
        </div>
      )
    } else {
    return(
      <div>
      <div className = 'related relatedCard'>
          <h3>{category} ::: {product}</h3>
          <h3>{price}</h3>
          <h4>{desc}</h4>
      </div>
      <StyleSelector product_id = {59553} />
  {/*     <ImageGallery className=' related relatedCard ' product_id = '59553' /> */}
      </div>
    )}
  }
}

export default ProductInfo;