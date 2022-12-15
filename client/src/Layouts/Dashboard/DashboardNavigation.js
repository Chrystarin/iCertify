import React, { PureComponent } from 'react'
import Logo from './../../Assets/Images/brand/icon.png';
import './../../Assets/Styles/Components/style-DashboardNavigation.scss';
import {Link} from "react-router-dom";

export class DashboardNavigation extends PureComponent {
  render() {
    return (
      <div>
        <div id='Logo'>
          <Link to="dashboard"><img src={Logo} alt=""/></Link>
        </div>
        <div id="Button_Holder">
          <ul>
            {/* To make the icon active just add class on li (actve) */}
            <li> 
              <Link to="credential" id=''>
              <svg className='Svg' data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.7 36.93"><path d="M32.09,2.65v29.1a3.14,3.14,0,0,1-3.29,3H5.94A2.86,2.86,0,0,0,8.87,37H31.62a2.81,2.81,0,0,0,2.95-2.65V5.27A2.75,2.75,0,0,0,32.09,2.65Z" transform="translate(-1.87 -0.07)"/><path d="M30.53,30.37V3.15a2.35,2.35,0,0,0-.09-.53A2.91,2.91,0,0,0,27.58.77H16.42a1.64,1.64,0,0,0-1.77,1.48v7A2.49,2.49,0,0,1,12,11.46H3.64a1.64,1.64,0,0,0-1.77,1.48V30.37a2.74,2.74,0,0,0,3,2.47H27.58A2.74,2.74,0,0,0,30.53,30.37Zm-7.78-2.13a1,1,0,0,1-1,1H11.55a1,1,0,0,1-1-1v-.8a1,1,0,0,1,1-1H21.77a1,1,0,0,1,1,1Zm3.7-5.69a1.1,1.1,0,0,1,0,.27,1,1,0,0,1-.95.72H7.85a1,1,0,0,1-1-1v-.8a1,1,0,0,1,1-1H25.46a1,1,0,0,1,1,1Zm0-5.69a1,1,0,0,1-1,1H7.85a1,1,0,0,1-1-1v-.8a1,1,0,0,1,1-1H25.46a1,1,0,0,1,1,1Z" transform="translate(-1.87 -0.07)"/><path d="M3.24,9.19a1.18,1.18,0,0,0,.27,0h7.05a1.87,1.87,0,0,0,.34,0A2.13,2.13,0,0,0,11.52,9a1.79,1.79,0,0,0,1.06-1.6V1.08A1.14,1.14,0,0,0,10.66.37L2.71,7.5A1,1,0,0,0,3.24,9.19Z" transform="translate(-1.87 -0.07)"/></svg>
              </Link>
              <span>Credential</span>
            </li>
            <li>
              <Link to="event" id=''>
                <svg className='Svg' data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 278.74 308.22"><path d="M246.19,27.22H227.35V11.41A11.41,11.41,0,0,0,215.94,0h-6.69a11.41,11.41,0,0,0-11.41,11.41V27.22H80.89V11.41A11.4,11.4,0,0,0,69.49,0h-6.7a11.4,11.4,0,0,0-11.4,11.41V27.22H32.55A32.55,32.55,0,0,0,0,59.77V74.85H278.74V59.77A32.55,32.55,0,0,0,246.19,27.22Z"/><path d="M0,275.67a32.55,32.55,0,0,0,32.55,32.55H246.19a32.55,32.55,0,0,0,32.55-32.55V97.27H0ZM79.07,174.51h27.31a12.91,12.91,0,0,0,12.28-8.93l8.44-26c3.86-11.89,20.68-11.89,24.54,0l8.44,26a12.91,12.91,0,0,0,12.28,8.93h27.31c12.5,0,17.7,16,7.58,23.34L185.16,213.9a12.89,12.89,0,0,0-4.69,14.43l8.44,26c3.86,11.89-9.75,21.77-19.86,14.42L147,252.68a12.91,12.91,0,0,0-15.18,0l-22.09,16.05C99.58,276.08,86,266.2,89.83,254.31l8.44-26a12.89,12.89,0,0,0-4.69-14.43L71.49,197.85C61.37,190.5,66.57,174.51,79.07,174.51Z"/></svg>
              </Link>
              <span>Events</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default DashboardNavigation