import React from 'react'
import '../Assets/Styles/Components/style-SearchInput.scss';
import userImg from '../Assets/Images/Resources/Developers/Dianne.jpg'

function SearchInput() {
  return (
    <div id='SearchInput'>
      <div id='Container_SearchInput'>
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.29 27.45"><path d="M29.18,29.88l-6.6-7.76a10.08,10.08,0,0,0,2.68-6.07,10.24,10.24,0,1,0-5.92,8.43l6.79,8ZM8.91,14.72a6.2,6.2,0,1,1,5.68,6.68A6.22,6.22,0,0,1,8.91,14.72Z" transform="translate(-4.89 -5.02)"/></svg>
        <input type="text" />
      </div>
      <div id='Container_Dropdown_Search_Result'>
        <ul>
          <SearchResut Result={false}/>
        </ul>
      </div>
    </div>
  )
}
function SearchResut(){
  return <>
    {/* <li>
      <a href="#">
        <img src={userImg} alt="img" />
        <div>
          <h6>Dianne Chrystalin Brandez</h6>
          <p className='BodyText2'>Joined Last Year</p>
        </div>
      </a>
    </li>
    <li>
      <a href="#">
        <img src={userImg} alt="img" />
        <div>
          <h6>Dianne Chrystalin Brandez</h6>
          <p className='BodyText2'>Joined Last Year</p>
        </div>
      </a>
    </li> */}
  </>
  
  
}

export default SearchInput