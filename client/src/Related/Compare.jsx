import React from 'react';
import './related.css';
import { IoMdCheckmark } from "react-icons/io";

const Compare = (props) => {
  return (
    <div>
      <p className='modal-title'>COMPARING</p>
      <table>
        <thead>
          <tr>
            <th>{props.currentItem.name}</th>
            <th className='right-modal'>{props.compProduct.name}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> <IoMdCheckmark /> </td>
            <td className='modal-text'> Made from real Cotton</td>
            <td className='right-modal'> <IoMdCheckmark /> </td>
          </tr>
        </tbody>
      </table>
    </div >
  )
};

export default Compare;