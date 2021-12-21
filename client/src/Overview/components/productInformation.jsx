import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      default: {}
    }
    this.search = this.search.bind(this);
  }


  componentDidMount() {
    this.search();
  }


  search = () => {
    $.ajax({
      type: "GET",
      url: '/overview',
      success: data => {
        //let products = JSON.parse(data)
        this.setState({productList: data, default: data[0]});
        //console.log('STATE HERE ', this.state);
      }
    })//console.log ('hardee har har, you thought you had me');
  }


  render() {
    var product = this.state.default.name;
    var desc = this.state.default.description;
    var category = this.state.default.category;
    var price = this.state.default.default_price;
    return(
      <div className = 'related relatedCard'>
          <h3>{category} > {product}</h3>
          <h3>{price}</h3>
          <h4>{desc}</h4>
      </div>
    )
  }
}

export default ProductInfo;