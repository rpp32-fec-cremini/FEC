import React from 'react';
import ReactDOM from 'react-dom';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      styleList: []
    }
  }

  render () {
    return (
      <div>
        <h1>STYLE SELECTOR HERE</h1>
      </div>
    )
  }

}

export default StyleSelector;