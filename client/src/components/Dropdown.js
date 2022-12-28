import React from 'react'

function Dropdown() {
  return (
    <div id='LabelHolder'>
        
        <h5>{props.Title} :</h5>
        <input type="text" placeholder={props.Holder} onInput={props.Action}/>
    </div>
  )
}

export default Dropdown