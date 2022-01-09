import React from 'react';
import { IoMdCheckmark } from "react-icons/io";

const Feature = (props) => {
  console.log(props)
  return (
    <tr>
      <td> <IoMdCheckmark /> </td>
      <td className='modal-text'>{props.feature}</td>
      <td className='right-modal'> <IoMdCheckmark /> </td>
    </tr>
  )
}

export default Feature;