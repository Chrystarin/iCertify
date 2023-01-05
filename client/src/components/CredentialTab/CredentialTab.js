import React from 'react'
import './CredentialTab.scss'
function CredentialTab(props) {
  return (
    <div id='Container_CredentialTab'>
        <ul>
          <li>
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.25 40.34"><defs></defs><path className="cls-1" d="M1.34,12H7.26a4.46,4.46,0,0,0,4.31-4.6V1.21A.93.93,0,0,0,10,.5L.68,10.28a1,1,0,0,0-.29.64A1,1,0,0,0,1.34,12Z" transform="translate(-0.39 -0.21)"/><path className="cls-1" d="M33.35,2.65a4,4,0,0,0-.8-1.27A3.86,3.86,0,0,0,31.37.52,3.47,3.47,0,0,0,29.92.21H13.36V9.4a4.18,4.18,0,0,1-4,4.31H.39V36.55a4.2,4.2,0,0,0,.3,1.56,3.85,3.85,0,0,0,.8,1.27,3.56,3.56,0,0,0,1.18.85,3.48,3.48,0,0,0,1.45.32h25.8a3.48,3.48,0,0,0,1.45-.32,3.67,3.67,0,0,0,1.18-.85,4,4,0,0,0,.8-1.27,4.4,4.4,0,0,0,.29-1.56V4.21A4.36,4.36,0,0,0,33.35,2.65Z" transform="translate(-0.39 -0.21)"/></svg>
            <div><h1>0</h1></div>
            <h5>My Documents</h5>
            <div><button className={(props.Active==="Documents")?'Selected':''} onClick={()=>props.Setter("Documents")}>View</button></div>
          </li>
          <li>
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.25 40.34"><defs></defs><path className="cls-1" d="M1.34,12H7.26a4.46,4.46,0,0,0,4.31-4.6V1.21A.93.93,0,0,0,10,.5L.68,10.28a1,1,0,0,0-.29.64A1,1,0,0,0,1.34,12Z" transform="translate(-0.39 -0.21)"/><path className="cls-1" d="M33.35,2.65a4,4,0,0,0-.8-1.27A3.86,3.86,0,0,0,31.37.52,3.47,3.47,0,0,0,29.92.21H13.36V9.4a4.18,4.18,0,0,1-4,4.31H.39V36.55a4.2,4.2,0,0,0,.3,1.56,3.85,3.85,0,0,0,.8,1.27,3.56,3.56,0,0,0,1.18.85,3.48,3.48,0,0,0,1.45.32h25.8a3.48,3.48,0,0,0,1.45-.32,3.67,3.67,0,0,0,1.18-.85,4,4,0,0,0,.8-1.27,4.4,4.4,0,0,0,.29-1.56V4.21A4.36,4.36,0,0,0,33.35,2.65Z" transform="translate(-0.39 -0.21)"/></svg>
            <div><h1>0</h1></div>
            <h5>My <br></br>Requests</h5>
            <div><button href='/Credential/MyRequestDocument' className={(props.Active==="Requests")?'Selected':''}  onClick={()=>props.Setter("Requests")}>View</button></div>
          </li>
        </ul>
    </div>
  )
}

export default CredentialTab