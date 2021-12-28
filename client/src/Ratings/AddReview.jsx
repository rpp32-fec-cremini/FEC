import React from "react";
import { useState } from "react";
import NewReview from "./NewReview.jsx";

var AddReviews = ({product, characteristics, product_id}) => {
  var [display, setDisplay] = useState("none")

  //Will load relevant characteristics from API
  var chars = !characteristics || Object.keys(characteristics).map(attr => [attr, characteristics[attr].id])

  return (
    <button onClick={(e) => {
      setDisplay("block")
    }}>Add A Review
      <div className="modal" style={{display}}>
        <div className="modal-content">
          <span className="close" onClick={(e) => {
            e.stopPropagation()
            setDisplay("none")
          }}>&times;</span>
          <div>
            <NewReview chars={chars} product={product} product_id={product_id}/>
          </div>
        </div>
      </div>
    </button>
  )
}

export default AddReviews;