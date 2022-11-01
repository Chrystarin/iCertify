import React from 'react';
import {useParams} from 'react-router-dom';

function Event() {

  //Use this id to pull event info from database
  const {id} = useParams()
  
  return (
    <div>
        <h1>Event {id}</h1><br />
        <h2>This shows the information of event {id}</h2>
    </div>
  )
}

export default Event;
