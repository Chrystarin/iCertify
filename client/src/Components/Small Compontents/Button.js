import React from 'react'

function Button(props) {
  if(props.Action === "Link"){
    // <Button Action="Link" Link="" BtnType="Primary / Primary2/ Secondary / Icon Button" Value="Content"/>
    return <a href={props.Link} id="Button" className={props.BtnType}>
        {props.Value}
    </a>
   
  }
  return (
    // <Button Action="Function" BtnType="Primary / Primary2 / Secondary / Icon Button" Value="Content"/>
    <button id="Button" className={props.BtnType}>
        {props.Value}
    </button>
  )
}

export default Button