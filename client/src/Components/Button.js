import React from 'react';
import './../Assets/Styles/Components/Small Components/SmallComponents.scss';

function Button(props) {
  if(props.Action === "Link"){
    // <Button Action="Link" Link="" BtnType="Primary / Primary2/ Secondary / Icon Button" Value="Content"/>
    return <a href={props.Link} id="Button" className={props.BtnType}>
        {props.Value}
    </a>
  }
  if(props.Action === "ButtonTab_Number"){
  {/* <Button Action="ButtonTab_Number" Type="Active / Inactive" Value="Content"/> */}
  return <button id="ButtonTab_Number" className={(props.Status==="Active")?"Active_ButtonTab_Number":"Inactive_ButtonTab_Number"}>
      <span>{props.Number}</span>
      <h6>{props.Value}</h6>
    </button>
  }
  return (
    // <Button Action="Function" BtnType="Primary / Primary2 / Secondary / Icon Button" Value="Content"/>
    <button id="Button" className={props.BtnType} type={props.type} onClick={props.onClick}>
        {props.Value}
    </button>
  )
}

export default Button