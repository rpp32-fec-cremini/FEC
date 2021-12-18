import React from "react";
import { useState } from "react";

var AddReviews = ({product}) => {
  var [modal, setModal] = useState(null)
  var [display, setDisplay] = useState("none")
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

          </div>
        </div>
      </div>
    </button>
  )
}

export default AddReviews;