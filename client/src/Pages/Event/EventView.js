import React, { useState, useEffect } from "react";

const EventView = (props) => {
    const {eventId} = "_onJEVl5";

    const [event, setEvent] = useState(null)

    useEffect(() => {
        const fetchEvent = async () => {
            const response  = await fetch('http://localhost:5000/api/events/:id')
            // const response  = await fetch('http://localhost:5000/api/events/_onJEVl5')

            const json = await response.json()
  
            if(response.ok){
                setEvent(json)
            }
        }
  
        fetchEvent()
    }, [])

  return (
    <div>
        <h1>EVENT VIEW</h1>
        {/* <ul>
            <li>Id: {event.eventId}</li>
            <li>Type: {event.type}</li>
            <li>Title: {event.title}</li>
            <li>Description: {event.description}</li>
            <li>Link: {event.link} </li>
            <li>Location: {event.location} </li>
            <li>Date Start: {event.date.start} </li>
            <li>Date End: {event.date.end}  </li>
            <li>CanClaimDocument: {event.canClaimDocument} </li>
            <li>Status: {event.status} </li>
            <li>isAcceptingVolunteer: {event.isAcceptingVolunteer} </li>
        </ul> */}
    </div>
  )
}

export default EventView
