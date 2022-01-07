import React from 'react';
import $ from 'jquery';

var timerId;

//this function prevents enormous amounts of API calls if clicks occur too fast in a row
var throttle = (func, delay) => {
  if (timerId) {
    return
  }

  timerId = setTimeout(() => {
    func();
    timerId = undefined;
  }, delay)
}

var getClicks = WrappedComponent => props => {
  var componentMap = {
    'AddReviews': 'Ratings',
    'Modal': 'Ratings',
    'ReviewsList': 'Ratings',
    'ProductBreakdown': 'Ratings',
    'RatingBreakdown': 'Ratings',
    'RatingContainer': 'Ratings',
    'SortReviews': 'Ratings',
    'NewReview': 'Ratings',
    'ReviewTile': 'Ratings',
  }
  var clicked = (e) => {
    e.stopPropagation();
    var element = WrappedComponent.name;
    var date = new Date();
    var widget = componentMap[WrappedComponent.name];
    throttle(() => $.ajax({
      method: "POST",
      url: "/interactions",
      data: JSON.stringify({element, date, widget}),
      contentType: "application/json"
    }), 1000)
  }
  return <WrappedComponent {...props} clicked={clicked}/>
}

export default getClicks

// This is a solution that involves no code in the WrappedComponent
  //However, this creates another enclosing div which ruins the CSS

    // var getClicks = WrappedComponent => props => (
    //   <div onClick={(e) => {
    //     e.stopPropagation();
    //     var element = e.target;
    //     var module = WrappedComponent.name;
    //     console.log(module, element)
    //   }}>
    //     <WrappedComponent {...props}/>
    //   </div>
    // )





