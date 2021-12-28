import React from 'react';
import { useState } from "react";
import $ from "jquery";

var rating;
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
        };
        for (var i = parseInt(id) + 1; i <= 5; i++) {
          $(`#${i}`).removeClass("filledStar").addClass("emptyStar")
        };
        $(".level").remove();
        $("#stars").append(`<span class="level">${ratings[id]}</span>`);
        rating = parseInt(id) + 1;
      }}>&#9733;</span>)}
    </div>
  )
}

var characteristics = {}
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
    characteristics[theme] = parseInt(key[1])+1
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

var photos = [];
var UploadImage = (props) => {
  return (
    <div>
      <input id="addImages" type='file' accept='image/png,image/jpg' onChange={() => {
        var imagePath = URL.createObjectURL($("#addImages")[0].files[0]);
        photos.push(imagePath)
        var img = $(`<img src=${imagePath} width="50px" height="50px"></img>`)
        img.appendTo($('#display_images'))
        if (photos.length === 5) {
          $("#addImages").remove()
          $("#imageStatus").html("Max Images Uploaded")
        }
      }}/>
      <div id="display_images"></div>
    </div>
  )
}

var NewReview = ({chars, product, product_id}) => {
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
      <input type="radio" id="true" name="recommended"/>
      <label>No</label>
      <input type="radio" id="false" name="recommended"/>
    </div>

    <div className='characteristics'>
      <label>Characteristics</label>
      {chars.map(char => <Character choice={char[0]} theme={char[1]} key={char[1]}/>)}
    </div>

    <div>
      <label>Review summary: <textarea id='summary' maxLength="60"/></label>
    </div>

    <div>
      <label>Review Body: <textarea id='writeBody' minLength="50"/></label>
    </div>

    <div className='imageUpload'>
      <label id="imageStatus">Add Images</label>
      <UploadImage/>
    </div>

    <div>
      <label>What is your nickname: <textarea maxLength="60" id='nickname' placeholder="Example: jackson11!"/></label>
      <div>For privacy reasons, do not use your full name or email address</div>
    </div>

    <div>
      <label>Your email: <textarea maxLength="60" id='email' placeholder="Example: jackson11@email.com"/></label>
      <div>For authentication reasons, you will not be emailed</div>
    </div>

    <div onClick={() => {
      var recCheck = $('input[name=recommended]:checked')[0];
      var recommend = recCheck ? recCheck.id : undefined;
      var summary = $("#summary").val();
      var body = $("#writeBody").val();
      var email = $("#email").val();
      var name = $("#nickname").val();
      var data = {
        product_id,
        rating,
        summary,
        body,
        recommend,
        name,
        email,
        photos,
        characteristics
      };
      console.log(data)
    }}>Submit</div>
  </div>
}

export default NewReview;