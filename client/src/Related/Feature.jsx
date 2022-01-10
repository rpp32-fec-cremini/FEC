import React from 'react';
import { IoMdCheckmark } from "react-icons/io";

const Feature = (props) => {
  let leftCheck, rightCheck;
  leftCheck = props.mainFeatures.includes(props.feature) ? <IoMdCheckmark /> : null;
  rightCheck = props.compFeatures.includes(props.feature) ? <IoMdCheckmark /> : null;

  return (
    <tr>
      <td className='left-modal'> {leftCheck} </td>
      <td className='modal-text'>{props.feature}</td>
      <td className='right-modal'> {rightCheck} </td>
    </tr>
  )
}

export default Feature;