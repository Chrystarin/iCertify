import React from 'react';
import {Link} from 'react-router-dom';

function EventList() {
  return (
    <div>
        <h1>EventList</h1><br />
        <h2>This is where the list of events will show</h2>

        <Link to="/events/1">Event #1</Link>
        <Link to="/events/2">Event #1</Link>
    </div>
  )
}

export default EventList;
