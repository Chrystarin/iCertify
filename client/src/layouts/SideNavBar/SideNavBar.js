import React, { PureComponent ,useState} from 'react'
import Logo from './../../images/iCertifyBranding/icon.png';
import {Link} from "react-router-dom";
import './SideNavBar.scss';
import SchoolIcon from '@mui/icons-material/School';
function SideNavBar(props) {

  return (
    <div id='Navigation__Sticky'>
        <div id='Logo'>
            <Link to={(props.UserType==="Admin")?`/institutions/${props.User}`:`/users/${props.User}`}><img src={Logo} alt=""/></Link>
        </div>
        <div id="Button_Holder">
            <ul>
                {/* To make the icon active just add class on li (actve) */}
                {
                (props.UserType === "Admin")?
                <>
                    <li className={window.location.pathname == '/documents' ? "active" : ""}> 
                        <a href="/documents/requests/verifyrequest" id=''>
                            <svg className='Svg' data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.7 36.93"><path d="M32.09,2.65v29.1a3.14,3.14,0,0,1-3.29,3H5.94A2.86,2.86,0,0,0,8.87,37H31.62a2.81,2.81,0,0,0,2.95-2.65V5.27A2.75,2.75,0,0,0,32.09,2.65Z" transform="translate(-1.87 -0.07)"/><path d="M30.53,30.37V3.15a2.35,2.35,0,0,0-.09-.53A2.91,2.91,0,0,0,27.58.77H16.42a1.64,1.64,0,0,0-1.77,1.48v7A2.49,2.49,0,0,1,12,11.46H3.64a1.64,1.64,0,0,0-1.77,1.48V30.37a2.74,2.74,0,0,0,3,2.47H27.58A2.74,2.74,0,0,0,30.53,30.37Zm-7.78-2.13a1,1,0,0,1-1,1H11.55a1,1,0,0,1-1-1v-.8a1,1,0,0,1,1-1H21.77a1,1,0,0,1,1,1Zm3.7-5.69a1.1,1.1,0,0,1,0,.27,1,1,0,0,1-.95.72H7.85a1,1,0,0,1-1-1v-.8a1,1,0,0,1,1-1H25.46a1,1,0,0,1,1,1Zm0-5.69a1,1,0,0,1-1,1H7.85a1,1,0,0,1-1-1v-.8a1,1,0,0,1,1-1H25.46a1,1,0,0,1,1,1Z" transform="translate(-1.87 -0.07)"/><path d="M3.24,9.19a1.18,1.18,0,0,0,.27,0h7.05a1.87,1.87,0,0,0,.34,0A2.13,2.13,0,0,0,11.52,9a1.79,1.79,0,0,0,1.06-1.6V1.08A1.14,1.14,0,0,0,10.66.37L2.71,7.5A1,1,0,0,0,3.24,9.19Z" transform="translate(-1.87 -0.07)"/></svg>
                        </a>
                        <span>Documents</span>
                    </li>
                    <li className={window.location.pathname == '/members' ? "active" : ""}>
                        <a href="/members" id=''>
                            <svg className='Svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 726.4 612.86"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M177.18,152a185,185,0,0,0,34,107.05A105.12,105.12,0,1,1,200.26,62.33,184.79,184.79,0,0,0,177.18,152Z"/><path d="M108.18,430.68a202.15,202.15,0,0,0-17.87,46.93A515.85,515.85,0,0,1,0,459.71V419.77c0-76.26,77.72-137.89,172.87-136.94l4.74.06a206.27,206.27,0,0,1,66.66,12h0a184.82,184.82,0,0,0,17.57,13c-33.89,11.1-65.1,27.67-91.93,49.18C143.58,378.19,122.81,403,108.18,430.68Z"/><path d="M655.58,162.73a105.18,105.18,0,0,1-141.9,98.5A185.68,185.68,0,0,0,525.21,60.66,105.18,105.18,0,0,1,655.58,162.73Z"/><path d="M726.37,422.41l-.89,37.3s-31.5,8.59-80.2,15c-9-34.62-27.54-67.32-54.36-95.25-32.57-33.91-75.29-59.1-123.26-73.59q7.59-5.18,14.62-11a206.28,206.28,0,0,1,72-12l4.75.06C653.3,284.43,728.16,346.89,726.37,422.41Z"/><path d="M515.2,152a151.92,151.92,0,1,1-21.41-77.84A151.28,151.28,0,0,1,515.2,152Z"/><path d="M617.55,527.48l-1.27,53.92s-259.63,70.78-497.44,0V523.65a161.15,161.15,0,0,1,5.9-43.2c20.2-72.83,90.43-130.52,180.14-148.76a305.48,305.48,0,0,1,63.9-6l6.87.09a306.76,306.76,0,0,1,47.41,4.44c93.23,16.16,166.48,74.41,188.05,148.25A161,161,0,0,1,617.55,527.48Z"/></g></g></svg>
                        </a>
                        <span>Members</span>
                    </li>
                    {/* <li className={window.location.pathname == '/analytics' ? "active" : ""}>
                        <a href="/analytics" id=''>
                            <svg className='Svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 588.39 588.39"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M540.4,0H48A48,48,0,0,0,0,48V540.39a48,48,0,0,0,48,48H540.4a48,48,0,0,0,48-48V48A48,48,0,0,0,540.4,0ZM194,520.77H133.6V237.71A12.71,12.71,0,0,1,146.3,225h34.95A12.71,12.71,0,0,1,194,237.71Zm130.42,0H264V321.6a12.1,12.1,0,0,1,12.1-12.1h36.15a12.11,12.11,0,0,1,12.11,12.1Zm117.17,0H381.19V138.71a18.18,18.18,0,0,1,18.18-18.18h24a18.18,18.18,0,0,1,18.18,18.18Z"/></g></g></svg>
                        </a>
                        <span>Analytics</span>
                    </li> */}
                </>
                :
                <>
                    <li className={window.location.pathname == '/requests' ? "active" : ""}> 
                        <a href="/requests" id=''>
                            <svg className='Svg' data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.7 36.93"><path d="M32.09,2.65v29.1a3.14,3.14,0,0,1-3.29,3H5.94A2.86,2.86,0,0,0,8.87,37H31.62a2.81,2.81,0,0,0,2.95-2.65V5.27A2.75,2.75,0,0,0,32.09,2.65Z" transform="translate(-1.87 -0.07)"/><path d="M30.53,30.37V3.15a2.35,2.35,0,0,0-.09-.53A2.91,2.91,0,0,0,27.58.77H16.42a1.64,1.64,0,0,0-1.77,1.48v7A2.49,2.49,0,0,1,12,11.46H3.64a1.64,1.64,0,0,0-1.77,1.48V30.37a2.74,2.74,0,0,0,3,2.47H27.58A2.74,2.74,0,0,0,30.53,30.37Zm-7.78-2.13a1,1,0,0,1-1,1H11.55a1,1,0,0,1-1-1v-.8a1,1,0,0,1,1-1H21.77a1,1,0,0,1,1,1Zm3.7-5.69a1.1,1.1,0,0,1,0,.27,1,1,0,0,1-.95.72H7.85a1,1,0,0,1-1-1v-.8a1,1,0,0,1,1-1H25.46a1,1,0,0,1,1,1Zm0-5.69a1,1,0,0,1-1,1H7.85a1,1,0,0,1-1-1v-.8a1,1,0,0,1,1-1H25.46a1,1,0,0,1,1,1Z" transform="translate(-1.87 -0.07)"/><path d="M3.24,9.19a1.18,1.18,0,0,0,.27,0h7.05a1.87,1.87,0,0,0,.34,0A2.13,2.13,0,0,0,11.52,9a1.79,1.79,0,0,0,1.06-1.6V1.08A1.14,1.14,0,0,0,10.66.37L2.71,7.5A1,1,0,0,0,3.24,9.19Z" transform="translate(-1.87 -0.07)"/></svg>
                        </a>
                        <span>Documents</span>
                    </li>
                    <li className={window.location.pathname == '/institutions' ? "active" : ""}>
                        <a href="/institutions" id=''>
                           <SchoolIcon className='Svg'/>
                        </a>
                        <span>Institutions</span>
                    </li>
                </>
                }
            </ul>
        </div>
      </div>
  )
}

export default SideNavBar



