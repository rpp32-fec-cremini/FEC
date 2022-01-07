import React from 'react';
import { useState } from 'react';
import getClicks from "../getClicks.jsx";

var Modal = ({images, clicked}) => {
  var [modal, setModal] = useState(null)
  var [display, setDisplay] = useState("none")
  return (
    <div onClick={(e) => clicked(e)}>
      {images.map(image => <img key={image.id} src={image.url} style={{"margin":"1px 20px 0 0", "height": "28px", "cursor":"pointer"}} onClick={(e) => {
        setModal(e.target.src)
        setDisplay("block")
      }}></img>)}
      <div className="modal" style={{display}} data-testid="modal">
        <div className="modal-content">
          <span className="close" onClick={() => setDisplay("none")} data-testid="close">&times;</span>
          <div style={{
            'height': '80%',
            'width': '100%',
            'display': 'flex',
            'justifyContent': 'center',
            'alignItems': 'center',
          }}>
            <img style={{
              "maxHeight":"80%",
              "maxWidth":"80%",
            }}src={modal}></img>
          </div>
        </div>
      </div>
    </div>
  )
}

export default getClicks(Modal);