import React, { useEffect } from 'react';
import $ from 'jquery';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import getClicks from "../getClicks.jsx";
import './related.css';

// class Arrows extends React.Component {
//   constructor(props) {
//     super(props);
//   }
const Arrows = (props) => {

  useEffect(() => {
    setArrows();
  }, [props.productId]);

  useEffect(() => {
    setList();
  }, [$(`#outfit-list`)]);

  let $container = $('.related-container');
  let $list = $(`#${props.type}-list`);
  let $card = $('.related-card');
  let backScrollId = `${props.type}-back-scroll`;
  let fwdScrollId = `${props.type}-fwd-scroll`;
  let $backBtn = $(`#${backScrollId}`);
  let $fwdBtn = $(`#${fwdScrollId}`);
  let children = props.listLength;
  let scrollPos = 0;
  let viewWidth = $container.width();
  let listWidth = (($card.width() + 20) * children) - 9;
  let scrollAmount = Math.ceil(listWidth / children);
  let extraWidth = listWidth - viewWidth;

  const setArrows = () => {
    scrollPos = 0;
    $list.css('left', '0');
    if (listWidth <= viewWidth) {
      $backBtn.addClass('hide');
      $fwdBtn.addClass('hide');
    } else {
      $backBtn.addClass('hide');
      $fwdBtn.removeClass('hide');
    }
  }

  const setList = () => {
    listWidth = (($card.width() + 20) * children) - 10;
  }

  const backClick = () => {
    if (scrollPos === 0) {
      $backBtn.addClass('hide');
      $fwdBtn.removeClass('hide');
    }

    if ((scrollPos + scrollAmount) < extraWidth) {
      if (extraWidth < scrollAmount) {
        scrollPos = 0;
        $backBtn.addClass('hide');
        $fwdBtn.removeClass('hide');
      } else if (scrollPos + scrollAmount >= scrollAmount) {
        scrollPos = 0;
        $backBtn.addClass('hide');
        $fwdBtn.removeClass('hide');
      } else {
        scrollPos += scrollAmount;
        $backBtn.removeClass('hide');
        $fwdBtn.removeClass('hide');
        if (-scrollPos < scrollAmount) {
          console.log('else if', scrollPos, extraWidth, scrollAmount);
          $backBtn.addClass('hide');
          scrollPos = 0;
        }
      }
    } else {
      console.log('second else', scrollPos, extraWidth, scrollAmount);
      scrollPos = 0;
      $backBtn.addClass('hide');
      $fwdBtn.removeClass('hide');
    }
    $list.css('left', `${scrollPos}px`);
  }

  const fwdClick = () => {
    if (-(scrollPos - scrollAmount) < extraWidth) {
      if (extraWidth < scrollAmount) {
        scrollPos -= extraWidth;
        $backBtn.removeClass('hide');
        $fwdBtn.addClass('hide');
      } else {
        $backBtn.removeClass('hide');
        console.log('full card before', scrollPos);
        scrollPos = scrollPos - scrollAmount;
        console.log('full card after', scrollPos);
        if (-(scrollPos - scrollAmount) > extraWidth) {
          console.log('else if', scrollPos, extraWidth, scrollAmount);
          scrollPos = -extraWidth;
          $fwdBtn.addClass('hide');
        }
      }
    } else {
      console.log('second else', scrollPos, extraWidth, scrollAmount);
      scrollPos = -extraWidth;
      $backBtn.removeClass('hide');
      $fwdBtn.addClass('hide');
    }
    $list.css('left', `${scrollPos}px`);
  }

  console.log(props.type, props.listLength, children);
  return (
    <div className='arrows'>
      {setArrows()}
      <IoIosArrowBack className='related-scroll' id={backScrollId} onClick={() => backClick()} />
      < IoIosArrowForward className='related-scroll' id={fwdScrollId} onClick={() => fwdClick()} />
    </div >
  )
}

export default getClicks(Arrows);