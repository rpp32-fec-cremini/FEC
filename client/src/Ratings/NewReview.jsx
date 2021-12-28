import React from 'react';
import { useState } from "react";
import $, { error } from "jquery";

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
        $("#stars").append(`<div class="level">${ratings[id]}</div>`);
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
      <div style={{"height":"5px", "fontSize":"10px", "fontStyle":"italic"}}>{meaning}</div>
      <div style={{"margin":"7px"}}>
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

var ReviewBody = (props) => {
  var [count, setCount] = useState(0)
  return (
  <div>
    <label>Review Body:</label><br></br>
    <textarea id='writeBody' minLength="50" maxLength="1000" onChange={(e) => {
      setCount(e.target.value.length)
    }}/>
    <div className='warning' id="counter">{count >= 50 ? "Minimum reached" : `Minimum required characters left: ${50 - count}`}</div>
  </div>)
}

var NewReview = ({chars, product, product_id}) => {
  var submitted = false;
  if (!Array.isArray(chars)) chars = [];
  return <div className='newReview'>
    <div className='title'>Write Your Review</div>
    <div className='subtitle'>About product {product}</div>

    <div className='starVote'>
      <label>Overall rating:</label>
      <Stars/>
    </div>

    <div className='recommend'>
      <label>Do you recommend this product? </label>
      <label>Yes</label>
      <input type="radio" id="true" name="recommended"/>
      <label>No</label>
      <input type="radio" id="false" name="recommended"/>
    </div>

    <div className='characteristics'>
      <label>Characteristics</label><br></br>
      {chars.map(char => <Character choice={char[0]} theme={char[1]} key={char[1]}/>)}
    </div>

    <div>
      <label>Review summary:</label><br></br>
      <textarea id='summary' maxLength="60"/>
    </div>

    <div>
      <ReviewBody/>
    </div>

    <div className='imageUpload'>
      <label id="imageStatus">Add Images: <UploadImage/></label>
    </div>

    <div>
      <label>What is your nickname:</label><br></br>
      <input type="text" maxLength="60" id='nickname' placeholder="Example: jackson11!"/>
      <div className='warning'>For privacy reasons, do not use your full name or email address</div>
    </div>

    <div>
    <label>Your email: </label><br></br>
      <input type="text" maxLength="60" id='email' placeholder="Example: jackson11@email.com"/>
      <div className='warning'>For authentication reasons, you will not be emailed</div>
    </div>

    <div id='submission'>
      <div id='btnBorder'>
        <div id="submitBtn" onClick={() => {
          var recCheck = $('input[name=recommended]:checked')[0];
          var recommend = recCheck ? recCheck.id : undefined;
          var summary = $("#summary").val();
          var body = $("#writeBody").val();
          var email = $("#email").val();
          var name = $("#nickname").val();

          if (rating === undefined || recommend === undefined || chars.length !== Object.keys(characteristics).length ||
          body.length < 50 || !name.length || !email.length) {
            if (!submitted) {
              var errorMessage =
                $(`<div id="error">
                  <h5>You must enter the following:</h5>
                  <div>This error will occur if:</div>
                  <ul>
                    <li>Any mandatory fields are blank</li>
                    <li>The review body is less than 50 characters</li>
                    <li>The email address provided is not in correct email format</li>
                    <li>The images selected are invalid or unable to be uploaded</li>
                  </ul>
                </div>`)
              errorMessage.addClass("error");
              $("#submission").prepend(errorMessage)
              submitted = true;
            }
          } else {
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
            console.log('success')
          }
        }}>Submit</div>
      </div>
    </div>
  </div>
}

export default NewReview;