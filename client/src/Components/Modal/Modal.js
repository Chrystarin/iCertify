import React from 'react';

import  './../../Assets/Styles/style-Modal.scss';



export default function Modal({open,onClose}) {
  if (!open) return null
  return (
    <div id='Modal' >
        <div onClick={onClose}></div>
        <div id="Container_Modal">
            <button onClick={onClose}>close</button>
        </div>
    </div>
  )
}
                                                