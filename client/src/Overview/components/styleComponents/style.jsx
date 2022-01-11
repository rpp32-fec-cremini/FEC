import React from 'react';
import ReactDOM from 'react-dom';
import {BsCheckSquare, AiOutlineCheckCircle} from "react-icons/io";
import CgCheck from "react-icons/cg";

const Style = (props) => {

  return (
    <div onClick={props.onClick}>
      {/* <h5>{props.name}</h5> */}
      <img className='styleThumbnail' src = {props.pic} style={{width: '65px', height:'65px'}} value = {JSON.stringify(props.value)} ></img>
    </div>
  )
}

export default Style;