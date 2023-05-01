import React from 'react'
import LoadingImg from '../../images/Resources/Design/Loading.gif'
function Loading() {
  return (
    <div className='Loading'>
        <img className='Errors__Img' src={LoadingImg} alt="" />
        <div className='Loading__Message'>
            <h3>Loading...</h3>
            <h6>Preparing for the data, Wait for a moment</h6>
        </div>
    </div>
  )
}

export default Loading