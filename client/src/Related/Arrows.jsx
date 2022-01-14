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
  let children = props.type === 'related' ? $list.children().length + 1 : $list.children().length;
  let scrollPos = 0;
  let viewWidth = $container.width();
  let listWidth = (($card.width() + 20) * children) - 10;
  let scrollAmount = listWidth / children;
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
        if (scrollPos + scrollAmount >= scrollAmount) {
          $backBtn.addClass('hide');
          scrollPos = 0;
        }
      }
    } else {
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
        scrollPos -= scrollAmount;
        if (-(scrollPos - scrollAmount) >= extraWidth) {
          scrollPos = -extraWidth;
          $fwdBtn.addClass('hide');
        }
      }
    } else {
      scrollPos = -extraWidth;
      $backBtn.removeClass('hide');
      $fwdBtn.addClass('hide');
    }
    $list.css('left', `${scrollPos}px`);
  }

  return (
    <div className='arrows'>
      {setArrows()}
      <IoIosArrowBack className='related-scroll' id={backScrollId} onClick={() => backClick()} />
      < IoIosArrowForward className='related-scroll' id={fwdScrollId} onClick={() => fwdClick()} />
    </div >
  )
}

export default getClicks(Arrows);