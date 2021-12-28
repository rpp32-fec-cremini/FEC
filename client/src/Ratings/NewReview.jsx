import React from 'react';
import { useState } from "react";
import $ from "jquery";

var Stars = (props) => {
  var ratings = {
    0: "Poor",
    1: "Fair",
    2: "Average",
    3: "Good",
    4: "Great",
  }
  return (
    <div id="stars" >
      {[...Array(5)].map((star, i) => <span key={i} id={i} className="emptyStar" onClick={(e) => {
        var id = e.target.id;
        for (var i = 0; i <= parseInt(id); i++) {
          $(`#${i}`).removeClass("emptyStar").addClass("filledStar")
        }
        for (var i = parseInt(id) + 1; i <= 5; i++) {
          $(`#${i}`).removeClass("filledStar").addClass("emptyStar")
        }
        $(".level").remove()
        $("#stars").append(`<span class="level">${ratings[id]}</span>`)
      }}>&#9733;</span>)}
    </div>
  )
}

var Character = ({choice, theme}) => {
  var charMap = {
    Size: ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too wide'],
    Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
    Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    Quality: ['Poor', 'Below Average', 'What I expected', 'Pretty great', 'Perfect'],
    Length: ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
  }
  var [meaning, setMeaning] = useState(null)
  var characterClick = function(e) {
    var key = e.target.id.split(',');
    setMeaning(charMap[key[0]][key[1]])
  }
  return (
    <div>
      <div>{meaning}</div>
      <div>
        <label>{choice}</label>
        <input type="radio" id={choice + ',0'} name={theme} onClick={(e) => characterClick(e)}/>
        <input type="radio" id={choice + ',1'} name={theme} onClick={(e) => characterClick(e)}/>
        <input type="radio" id={choice + ',2'} name={theme} onClick={(e) => characterClick(e)}/>
        <input type="radio" id={choice + ',3'} name={theme} onClick={(e) => characterClick(e)}/>
        <input type="radio" id={choice + ',4'} name={theme} onClick={(e) => characterClick(e)}/>
      </div>
    </div>
  )
}

var NewReview = ({chars, product}) => {
  if (!Array.isArray(chars)) chars = [];
  return <div className='newReview'>
    <h1>Write Your Review</h1>
    <h2>About product {product}</h2>

    <div className='starVote'>
      <label>Overall rating:</label>
      <Stars/>
    </div>

    <div className='recommend'>
      <label>Do you recommend this product?</label>
      <label>Yes</label>
      <input type="radio" name="recommended"/>
      <label>No</label>
      <input type="radio" name="recommended"/>
    </div>

    <div className='characteristics'>
      <label>Characteristics</label>
      {chars.map(char => <Character choice={char} theme={char} key={char}/>)}
    </div>

    <div className='summary'>
      <label>Review summary: <textarea maxLength="60"/></label>
    </div>

    <div className='writeBody'>
      <label>Review Body: <textarea minLength="50"/></label>
    </div>
  </div>
}

export default NewReview;