import React from 'react';
import { useState } from 'react';
import $ from 'jquery';

var Modal = ({images}) => {
  var [modal, setModal] = useState(null)
  var [display, setDisplay] = useState("none")
  return (
    <div>
      {images.map(image => <img key={image.id} src={image.url} style={{"margin":"2px"}} onClick={(e) => {
        setModal(e.target.src)
        setDisplay("block")
      }}></img>)}
      <div id="myModal" className="modal" style={{display}}>
        <div className="modal-content">
          <span className="close" onClick={() => setDisplay("none")}>&times;</span>
          <div style={{
            'height': '80%',
            'width': '100%',
            'display': 'grid',
            'justifyContent': 'center',
            'alignItems': 'center',
          }}>
            <img style={{
              "maxHeight":"100%",
              "maxWidth":"100%"
            }}src={modal}></img>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;