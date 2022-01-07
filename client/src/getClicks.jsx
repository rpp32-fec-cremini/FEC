import React from 'react';

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

var getClicks = WrappedComponent => props => {
  var clicked = (e) => {
    console.log(e.target)
  }
  return <WrappedComponent {...props} clicked={clicked}/>
}





export default getClicks