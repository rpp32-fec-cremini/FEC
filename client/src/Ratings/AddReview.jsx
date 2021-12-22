import React from "react";
import { useState } from "react";

import NewReview from "./NewReview.jsx";

var AddReviews = ({product, characteristics}) => {
  var [modal, setModal] = useState(null)
  var [display, setDisplay] = useState("none")
  var chars = !characteristics || Object.keys(characteristics)
  return (
    <button onClick={(e) => {
      setModal(e.target.src)
      setDisplay("block")
    }}>Add A Review
      <div id="myModal" className="modal" style={{display}} data-testid="modal">
        <div className="modal-content">
          <span className="close" onClick={(e) => {
            e.stopPropagation()
            setDisplay("none")
          }} data-testid="close">&times;</span>
          <div style={{
            'height': '80%',
            'width': '100%',
            'display': 'grid',
          }}>
            <h1>Write Your Review</h1>
            <h2>About product {product}</h2>
            <NewReview chars={chars}/>
          </div>
        </div>
      </div>
    </button>
  )
}

export default AddReviews;