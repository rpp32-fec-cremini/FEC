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
  let scrollAmount = props.type === 'outfit' ? Math.ceil(listWidth / children) + 1 : Math.ceil(listWidth / children);
  let extraWidth = listWidth - viewWidth;
  let ariaBack = `${props.type} list back arrow`;
  let ariaFwd = `${props.type} list forward arrow`;

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
  }

  const backClick = () => {
    if (scrollPos === start) {
      $backBtn.addClass('hide');
      $fwdBtn.removeClass('hide');
    }

    if ((scrollPos + scrollAmount) < extraWidth) {
      if (extraWidth < scrollAmount) {
        scrollPos = start;
        $backBtn.addClass('hide');
        $fwdBtn.removeClass('hide');
      } else if ((scrollPos + scrollAmount) >= scrollAmount) {
        scrollPos = start;
        $backBtn.addClass('hide');
        $fwdBtn.removeClass('hide');
      } else {
        scrollPos += scrollAmount;
        $backBtn.removeClass('hide');
        $fwdBtn.removeClass('hide');
        if (-(scrollPos - 10) < scrollAmount) {
          scrollPos = start;
          $backBtn.addClass('hide');
        }
      }
    } else {
      scrollPos = start;
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
        scrollPos = scrollPos - scrollAmount;
        if (-((scrollPos - scrollAmount) + 10) > extraWidth) {
          scrollPos = -(extraWidth + 3);
          $fwdBtn.addClass('hide');
        }
      }
    } else {
      scrollPos = -(extraWidth + 3);
      $backBtn.removeClass('hide');
      $fwdBtn.addClass('hide');
    }
    $list.css('left', `${scrollPos}px`);
  }

  return (
    <div data-testid='arrows' className='arrows'>
      {setArrows()}
      <IoIosArrowBack aria-label={ariaBack} className='related-scroll' id={backScrollId} onClick={() => backClick()} />
      < IoIosArrowForward aria-label={ariaFwd} className='related-scroll' id={fwdScrollId} onClick={() => fwdClick()} />
    </div >
  )
}

export default getClicks(Arrows);