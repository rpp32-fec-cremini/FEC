import React from 'react';
import ReactDOM from 'react-dom';

const Style = (props) => {
  return (
    <div>
      <h5>{props.name}</h5>
      <img src = {props.pic} style={{width: '100px', height:'100px'}}></img>
    </div>
  )
}

export default Style;