import React,{useState, useEffect} from 'react';
import './SelectEventPanel.scss';

import Card from '../../components/Card/Card';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import axios from '../../config/axios';

function SelectEvent(props) {
  const {title} = props;
  const [Dropdown,setDropdown] = useState(false);
  const [events, setEvents] = useState(null)

  useEffect(() => {
      // Retrieves All Events Data
        const fetchEvents = async () => {
            const response = await axios.get(`/events`)
            .then((response)=>{
                setEvents(response.data)
            })
        }

      fetchEvents()
  }, [])

  // Returns if event is null
  if(!events) return <div>loading...</div>

  return (
    <>
        <div id='SelectEvent'>
            <div id="Select__Div" onClick={()=> setDropdown(!Dropdown)}>
                <h5  id='EventTitle'>{title}</h5>
                <ExpandLessIcon/>
            </div>
            <div id='SelectDropDown' className={Dropdown?"Panel__Container SelectDropDownActive": "Panel__Container SelectDropDownInactive"}>
              <h3 id='SelectDropDown_h3'>Events to manage</h3>
              <h5 id='SelectDropDown_h5'>Choose Event to manage</h5>
              <div className='Wrapper__Card' >
                {/* <Card cardType="Admin"/> */}
                {events.length > 0 && events.map((event) => {
                    return(
                        <Card 
                            title={event.title} 
                            key={event.eventId} 
                            id={event.eventId} 
                            role={event.role}
                            type={'event_mint'}
                        />)
                })}
              </div>
            </div>
        </div>
    </>
  )
}

export default SelectEvent