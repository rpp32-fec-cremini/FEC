import React from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import $ from 'jquery';
import getClicks from "../getClicks.jsx";

class Scroll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardSize: $('.related-card').outerWidth(true),
      visiblelist: null,
      listSize: null,
      listPos: null,
      length: null,
      list: null
    }
  }

  componentDidMount() {
    this.getContainerSize();
    this.getListSize();
    this.scrollClick();
    console.log(this.state.length);
  }

  componentDidUpdate() {
    if (this.state.length !== this.props.length) {
      this.setState({ length: this.props.length });
    }
    console.log(this.state.length);
    if (this.state.list !== this.props.list) {
      this.setState({ list: this.props.list });
      this.scrollClick();
    }
    console.log(this.state.list);
  }

  getContainerSize = () => {
    let visibleList = $('.related-container').outerWidth();
    this.setState({ visibleList: visibleList });
  }

  containerSize = () => {
    $(window).on('resize', function () {
      let size = this.getContainerSize();
      this.setState({ visibleList: size });
    });
  }

  getListSize = () => {
    let listSize = this.state.length * this.state.cardSize;
    this.setState({ listSize: listSize });
  }

  getListPos = () => {
    let position = $(this.state.list).scrollLeft();
    this.setState({ listPos: position });
  }

  scrollClick = () => {
    console.log('scrollclick called');
    let scrollMargin = 30;
    this.getListPos();
    let listPos = this.state.listPos;
    let hiddenList = this.state.listSize - this.state.visibleList;
    let listOffset = hiddenList - scrollMargin;
    console.log('POS ', listPos, 'MARGIN ', scrollMargin, 'OFFSET ', listOffset);
    $(this.state.list).on('scroll', () => {
      // this.getListPos();
      // let listPos = this.state.listPos;
      // let hiddenList = this.state.listSize - this.state.visibleList;
      // let listOffset = hiddenList - scrollMargin;

      console.log('POS ', listPos, 'MARGIN ', scrollMargin, 'OFFSET ', listOffset);

      if (listPos <= scrollMargin) {
        $('.left-scroll').addClass('hide');
        $('.right-scroll').removeClass('hide');
      } else if (listPos < listOffset) {
        // show both paddles in the middle
        $('.left-scroll').removeClass('hide');
        $('.right-scroll').removeClass('hide');
      } else if (listPos >= listOffset) {
        $('.left-scroll').removeClass('hide');
        $('.right-scroll').addClass('hide');
      }
    })
  }

  scrollLeft = () => {
    console.log('left clicked');
    let scrollDuration = 300;
    let hiddenList = this.state.listSize - this.state.visibleList;
    $('.left-scroll').on('click', () => {
      $(this.state.list).animate({ scrollLeft: '0' }, scrollDuration);
    });
  }

  scrollRight = () => {
    console.log('right clicked');
    let scrollDuration = 300;
    let hiddenList = this.state.listSize - this.state.visibleList;
    $('.right-scroll').on('click', () => {
      $(this.state.list).animate({ scrollLeft: hiddenList }, scrollDuration);
    });
  }

  render() {
    return (
      <div>
        <IoIosArrowBack className='related-scroll left-scroll hide' onClick={this.scrollLeft} />
        < IoIosArrowForward className='right-scroll related-scroll' onClick={this.scrollRight} />
      </div >
    )
  }
}

export default getClicks(Scroll);