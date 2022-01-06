import React from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import $ from 'jquery';

const Scroll extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      scrollMargin: 20,
      viewSize: null,
      listSize: null,
      invisibleSize: null,
      listPos: null
    }
  }

setlistSize = () => {
  let list = this.props.itemWidth * this.props.listLength;
  this.setState({ listSize: list });
}

setViewSize = () => {
  let view = this.props.container.outerWidth();
  this.setState({ viewSize: view });
}

setInvisibleSize = () => {
  let invisible = this.state.listSize - this.state.viewSize;
  this.setState({ invisibleSize: invisible });
}

setListPos = () => {
  let pos = this.props.list.scrollLeft();
  this.setState({ listPos: pos });
}

scrollList = () => {
  const list = this.props.list;
  $(list).scroll(() => {
    let { scrollMargin, viewSize, listSize, invisibleSize, listPos } = this.state;
    this.setListPos();
    let listOffset = invisibleSize - tscrollMargin;

    if (listPos <= scrollMargin) {
      $('.left-scroll').addClass('hide');
      $('.right-scroll').removeClass('hide');
    } else if (list < listOffset) {
      $('.right-scroll').removeClass('hide');
      $('.left-scroll').removeClass('hide');
    }
  }

  })


}




// let listSize = #items * itemWidth || list.width
// let visibleSize =

showArrows = () => {
  if (listPos <= scrollMargin) {
    $('.left-scroll').addClass('hide');
  }
}

leftPaddleScroll = () => {

}

rightPaddleScroll = () => {

}


render() {
  return (
    <div>
      <IoIosArrowBack className='related-scroll left-scroll' />
      < IoIosArrowForward className='right-scroll related-scroll' />
    </div>
  )
}
};

export default Scroll;