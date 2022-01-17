import React, { useEffect } from 'react';
import $ from 'jquery';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import getClicks from "../getClicks.jsx";
import './related.css';

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
  let start = 0;
  let scrollPos = start;
  let viewWidth = props.type === 'outfit' ? $container.width() - 211 : $container.width();
  let listWidth = (($card.width() + 20) * children) - 9;
  let scrollAmount = Math.ceil(listWidth / children) + 1;
  let extraWidth = listWidth - viewWidth;
  let index = Math.floor(Math.abs(scrollPos) / scrollAmount);

  const setArrows = () => {
    scrollPos = start;
    $list.css('left', start);
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
    extraWidth = listWidth - viewWidth;

    if (props.type === 'outfit') {
      console.log(props.type, 'passed length', props.listLength, 'children', children);
      console.log('list width', listWidth, 'extra width', extraWidth, 'pos', index);
    }
  }

  const getIndex = () => Math.floor(Math.abs(scrollPos) / scrollAmount);

  const fadeItem = () => {
    let index = getIndex();
    // console.log('index', index);
    let $item = $list.find('li').eq(index);
    let $first = $list.find('li').eq(0);
    // console.log('items', $item);
    let end = $('#related-add').offset().left + 100;
    let distance = $item.offset().left;
    let opacity = 1;

    console.log('end', end, 'distance', distance);

    // if (distance > end) {
    //   $item.css("opacity", 1 - end / 210);
    // }
  }

  const backClick = () => {
    if (scrollPos === start) {
      $backBtn.addClass('hide');
      $fwdBtn.removeClass('hide');
    }

    if ((scrollPos + scrollAmount) < extraWidth) {
      if (extraWidth < scrollAmount) {
        scrollPos = start;
        fadeItem();
        $backBtn.addClass('hide');
        $fwdBtn.removeClass('hide');
      } else if ((scrollPos + scrollAmount) >= scrollAmount) {
        scrollPos = start;
        fadeItem();
        $backBtn.addClass('hide');
        $fwdBtn.removeClass('hide');
      } else {
        scrollPos += scrollAmount;
        fadeItem();
        $backBtn.removeClass('hide');
        $fwdBtn.removeClass('hide');
        if (-(scrollPos - 10) < scrollAmount) {
          console.log('back else if', scrollPos, scrollAmount);
          $backBtn.addClass('hide');
          scrollPos = start;
          fadeItem();
        }
      }
    } else {
      console.log('second else', scrollPos, extraWidth, scrollAmount);
      scrollPos = start;
      fadeItem();
      $backBtn.addClass('hide');
      $fwdBtn.removeClass('hide');
    }
    $list.css('left', `${scrollPos}px`);
  }

  const fwdClick = () => {
    if (-(scrollPos - scrollAmount) < extraWidth) {
      if (extraWidth < scrollAmount) {
        scrollPos -= extraWidth;
        fadeItem();
        $backBtn.removeClass('hide');
        $fwdBtn.addClass('hide');
      } else {
        $backBtn.removeClass('hide');
        scrollPos = scrollPos - scrollAmount;
        fadeItem();
        if (-((scrollPos - scrollAmount) + 10) > extraWidth) {
          console.log('fwd else if', scrollPos, scrollAmount, extraWidth);
          scrollPos = -(extraWidth + 3);
          fadeItem();
          $fwdBtn.addClass('hide');
        }
      }
    } else {
      console.log('second else', scrollPos, extraWidth, scrollAmount);
      scrollPos = -(extraWidth + 3);
      fadeItem();
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