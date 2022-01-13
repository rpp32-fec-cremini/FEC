import React from 'react';
import $ from 'jquery';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import getClicks from "../getClicks.jsx";
import './related.css';

class Arrows extends React.Component {
  constructor(props) {
    super(props);
  }

  // getOffset = () => {
  //   let $container = $('.arrows').parents('#related-container');
  //   let $list = $('.arrows').parents('#related-list');
  //   console.log($list.className);
  //   // console.log(list.position().left);
  //   $('.related-container').parents('#root, body, html').css({ 'overflow': 'auto' });
  // }


  render() {
    return (
      <div className='arrows'>
        <IoIosArrowBack className='related-scroll left-scroll' onClick={() => this.props.getOffset()} />
        < IoIosArrowForward className='right-scroll related-scroll' onClick={() => this.props.getOffset()} />
      </div >
    )
  }
}

export default getClicks(Arrows);