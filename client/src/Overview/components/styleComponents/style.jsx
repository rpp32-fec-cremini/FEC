import React from 'react';
import ReactDOM from 'react-dom';

const Style = (props) => {
  return (
    <div>
      <h4>Current Style</h4>
      <h5>{props.style}</h5>
    </div>
  )
}

export default Style;