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
    this.search();
  }


  search = () => {
    //console.log('I SEND THEE, ', userName , ' to the FUCKING MOON')
    $.ajax({
      type: "GET",
      url: '/overview/styles',
      success: data => {
        //let products = JSON.parse(data)
        console.log('Success!', data);
        this.setState({styleList: data.results, currentStyle: data.results[0]});
        console.log('STATE FUCKING HERE ', this.state);
      }
    })//console.log ('hardee har har, you thought you had me');
  }

  render () {


    return (
      <div>
         <h1 data-testid = 'style'>Available Styles</h1>
        <br></br>
      <div className = 'related relatedCard grid-5' style={{width: '100%'}}>
        {this.state.styleList.map((style) =>
      <Style name={style.name} pic = {style.photos[0].thumbnail_url} />
    )}
      </div>
      </div>
    )
  }

}

export default StyleSelector;