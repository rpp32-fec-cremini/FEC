import React from 'react';

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
    console.log(element, date, widget)
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





