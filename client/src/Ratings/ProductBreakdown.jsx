import React from "react";
import getClicks from "../getClicks.jsx";

var ProductBar = ({desc, meta, charMap}) => {
  var perc = (meta.value/5) * 100
  var descriptions = charMap[desc]
  return (
    <div data-testid={desc}>
      <div>{desc}</div>
      <div className="productBars">
        <div className="charBar"></div>
        <div className="charBar"></div>
        <div className="charBar"></div>
        <div className="iconBar" style={{"width": `${perc}%`}}><i className="fas fa-caret-down" style={{"fontSize": "1.5em"}}></i></div>
      </div>
      <div className="productBars">
        <div className="charDescription"><span style={{"fontSize":"12px"}}>{descriptions[0]}</span></div>
        <div className="charDescription"><span style={{"fontSize":"12px"}}>{descriptions[2]}</span></div>
        <div className="charDescription"><span style={{"fontSize":"12px"}}>{descriptions[4]}</span></div>
      </div>
    </div>
  )
}

var ProductBreakdown = ({characteristics, charMap, clicked}) => {
  var chars = characteristics ? characteristics : {};
  return (
    <div onClick={(e) => clicked(e)}>
      {Object.keys(chars).map(char => <ProductBar key={char} desc={char} meta={chars[char]} charMap={charMap}/>)}
    </div>
  )
}

export default getClicks(ProductBreakdown);