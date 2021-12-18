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
      <div className = 'related relatedCard ' style={{width: '100%'}}>
        <h1 data-testid = 'style'>STYLE SELECTOR HERE</h1>
      </div>
    )
  }

}

export default StyleSelector;