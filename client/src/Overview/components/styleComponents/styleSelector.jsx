import React from 'react';
import ReactDOM from 'react-dom';
import Style from './style.jsx';
import $ from 'jquery';


class StyleSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      styleList: [],
      currentProduct: '',
      currentStyle: ''
    }
    this.search = this.search.bind(this);

  }

  componentDidMount() {
    console.log('When it mounted ', this.props.product_id);
    this.search();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.search();
    }
  }


  search = () => {
    $.ajax({
      type: "GET",
      url: `overview/products/${this.props.product_id}/styles`,
      success: products => {
        //console.log('STYLE Data is here! ', products);
        this.setState({styleList: products.results, currentStyle: products.results[0]});
        //console.log('STYLE STATE HERE ', this.state);
      }
    })
  }

  render () {
    if(!this.props.product_id) {
      return (
        <div>
          <h1>NO DATA HERE NANANANANAN BATMAN</h1>
        </div>
      )
    } else {
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

}

export default StyleSelector;