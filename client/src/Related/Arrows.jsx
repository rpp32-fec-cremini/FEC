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

  let $container = $('.related-container');
  let $list = $(`#${props.type}-list`);
  let $card = $('.related-card');
  let backScrollId = `${props.type}-back-scroll`;
  let fwdScrollId = `${props.type}-fwd-scroll`;
  let $backBtn = $(`#${backScrollId}`);
  let $fwdBtn = $(`#${fwdScrollId}`);
  let children = props.type === 'related' ? $list.children().length + 1 : $list.children().length;
  let scrollPos = 0;
  let scrollAmount = $card.width() + 20;
  let viewWidth = $container.width();
  let listWidth = ($card.width() + 17) * children;
  let extraWidth = listWidth - viewWidth;

  const setArrows = () => {
    console.log('WIDTHS ', listWidth, viewWidth, extraWidth);
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

  const backClick = () => {
    console.log('pos amt ', scrollPos, scrollAmount);
    if (scrollPos === 0) {
      $backBtn.addClass('hide');
      $fwdBtn.removeClass('hide');
    }

    console.log(scrollPos + scrollAmount);
    if ((scrollPos + scrollAmount) < extraWidth) {
      if (extraWidth < scrollAmount) {
        console.log('BACK pos < EW & EW < card');
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
      console.log('BACK pos > EW');
      scrollPos = 0;
      $backBtn.addClass('hide');
      $fwdBtn.removeClass('hide');
    }
    console.log(scrollPos);
    $list.css('left', `${scrollPos}px`);
  }

  const fwdClick = () => {
    console.log('EXtra width start: ', extraWidth);
    if (-(scrollPos - scrollAmount) < extraWidth) {
      if (extraWidth < scrollAmount) {
        console.log('pos < EW & EW < card');
        scrollPos -= extraWidth;
        $backBtn.removeClass('hide');
        $fwdBtn.addClass('hide');
      } else {
        console.log('pos < EW & EW > card');
        $backBtn.removeClass('hide');
        scrollPos -= scrollAmount;
      }
    } else {
      console.log('pos > EW');
      scrollPos = -extraWidth + 3;
      $backBtn.removeClass('hide');
      $fwdBtn.addClass('hide');
    }
    console.log(scrollPos);
    $list.css('left', `${scrollPos}px`);
  }

  return (
    <div className='arrows'>
      {console.log('POS ', scrollPos)}
      {setArrows()}
      <IoIosArrowBack className='related-scroll' id={backScrollId} onClick={() => backClick()} />
      < IoIosArrowForward className='related-scroll' id={fwdScrollId} onClick={() => fwdClick()} />
    </div >
  )
}

export default getClicks(Arrows);