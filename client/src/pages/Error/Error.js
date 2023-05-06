import React from 'react';
import Error404Image from '../../images/Resources/Design/Error404.png';
import UnautherizePage from '../../images/Resources/Design/unautherize.png'


function Error404({unauthorized}) {
  return (
    <div className='Errors'>
      {unauthorized?<>
        <img className='Errors__Img' src={UnautherizePage} alt="" />
        <div className='Errors__Message'>
          <h3>Unauthorized</h3>
          <h5>You don't have access to this page</h5>
        </div>
      </>:<>
        <img className='Errors__Img' src={Error404Image} alt="" />
        <div className='Errors__Message'>
          <h3>Error 404</h3>
          <h5>PAGE NOT FOUND !</h5>
        </div>
      </>}
    </div>
  )
}

export default Error404;
