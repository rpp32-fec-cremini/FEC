import React from 'react';
import ReactDOM from 'react-dom';
import Style from './style.jsx';
import $ from 'jquery';


class StyleSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      styleList: [],
      currentStyle: ''
    }
    this.search = this.search.bind(this);

  }

  componentDidMount() {
    console.log('When it mounted ', this.props.product_id);
    this.search(this.props.product_id);
  }


  search = (id) => {
    $.ajax({
      type: "GET",
      url: `products/${id}/styles`,
      success: info => {
        //let products = JSON.parse(data)
        console.log('Data is here! ', info);
        this.setState({styleList: info.results, currentStyle: info.results[0]});
        console.log('STATE HERE ', this.state);
      }
    })
  }

  render () {


    return (
      <div>
         <h1 data-testid = 'style'>Available Styles</h1>
        <br></br>
      <div className = 'related relatedCard grid-5' style={{width: '100%'}}>
        {this.state.styleList.map((style) =>
      <Style name={style.name} pic = {style.photos[0].thumbnail_url} key ={style.style_id} />
    )}
      </div>
      </div>
    )
  }

}

export default StyleSelector;