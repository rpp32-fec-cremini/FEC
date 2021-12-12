import React from 'react';
import ReactDOM from 'react-dom';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>
          Overview Here
        </h1>
        <ImageGallery />
        <ProductInfo />
        <AddToCart />

      </div>
    );
  }
}

ReactDOM.render(
  <Overview  />,
  document.getElementById('overview')
)