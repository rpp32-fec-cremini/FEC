import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInfo: []
    }
    this.search = this.search.bind(this);
  }


  componentDidMount() {
    this.search();
  }


  search = () => {
    //console.log('I SEND THEE, ', userName , ' to the FUCKING MOON')
    $.ajax({
      type: "GET",
      url: '/overview',
      success: data => {
        //let products = JSON.parse(data)
        console.log('Success!', data.data);
        this.setState({currentInfo: data.data[0]})
        console.log('STATE FUCKING HERE ', this.state.currentInfo);
      }
    })//console.log ('hardee har har, you thought you had me');
  }


  render() {
    var product = this.state.currentInfo.name;
    var desc = this.state.currentInfo.description;
    var category = this.state.currentInfo.category;
    var price = this.state.currentInfo.default_price;
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