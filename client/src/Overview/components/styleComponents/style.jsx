import React from 'react';
import ReactDOM from 'react-dom';

const Style = (props) => {
  console.log('\nall props recieved by Style component:', props);
  return (
    <div onClick={props.onClick}>
      <h5>{props.name}</h5>
      <img src = {props.pic} style={{width: '100px', height:'100px'}} value = {JSON.stringify(props.value)} ></img>
    </div>
  )
}

export default Style;