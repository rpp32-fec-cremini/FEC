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

var getClicks = WrappedComponent => props => (
  React.cloneElement(<WrappedComponent/>, {
    ...props,
    onClick: () => { console.log('hello') }
  })
);




export default getClicks