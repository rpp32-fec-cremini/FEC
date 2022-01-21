import React from 'react';
import { IoMdCheckmark } from "react-icons/io";
import getClicks from '../getClicks.jsx'

const Feature = (props) => {
  let leftCheck, rightCheck;
  leftCheck = props.mainFeatures.includes(props.feature) ? <IoMdCheckmark /> : null;
  rightCheck = props.compFeatures.includes(props.feature) ? <IoMdCheckmark /> : null;

  return (
    <li className='modal-item'>
      <span className='left-modal'> {leftCheck} </span>
      <span className='modal-text center-modal'>{props.feature}</span>
      <span className='right-modal'> {rightCheck} </span>
    </li>
  )
}

export default getClicks(Feature);