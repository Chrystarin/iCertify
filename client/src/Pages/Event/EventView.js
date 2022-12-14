import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EventView = (props) => {
    const { id } = useParams()
    const [event, setEvent] = useState(props)

    useEffect(() => {
        const fetchEvent = async () => {
            const response  = await fetch(`http://localhost:5000/api/events/${id}`)

            const json = await response.json()

            if(response.ok){
                setEvent(json)
            }
        }

        fetchEvent()
    }, [])

    if(!event) return <div>loading...</div>

    return (
        <div>
            <h1>EVENT VIEW</h1>
            <ul>
                <li>Id: {event.eventId}</li>
                <li>Type: {event.type}</li>
                <li>Title: {event.title}</li>
                <li>Description: {event.description}</li>
                <li>Link: {event.link} </li>
                <li>Location: {event.location} </li>
                <li>Date Start: {event.date ? event.date.start : '...'} </li>
                <li>Date End: {event.date ? event.date.end : '...'}  </li>
                <li>CanClaimDocument: {event.canClaimDocument} </li>
                <li>Status: {event.status} </li>
                <li>isAcceptingVolunteer: {event.isAcceptingVolunteer} </li>
            </ul>
        </div>
    )
}

export default EventView
