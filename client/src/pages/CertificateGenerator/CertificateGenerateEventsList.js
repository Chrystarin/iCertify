import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import '../MintTransfer/MintTransfer.scss';
import './../../styles/Main.scss';
import Card from '../../components/Card/Card';
import axios from '../../config/axios';

function CertificateGenerateEventsList() {
	const navigate = useNavigate();
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

	if (!events) return <div>loading...</div>;

	return (
		<>
			<div className='AdminPanelContainer'>
				<section id='MintNTransfer'>
					<div id='Header'>
						<div className='MintNTransfer__Wrapper'>
							<div className='Title__Div'>
								<h2 className='SectionTitle'>
									Generate Certificate
								</h2>
								<h5 className='SectionSubTitle'>Select an event</h5>
							</div>
							
						</div>
					</div>
					<div id='Body'>
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
				</section>
				<div id='SideContent'>
					
				</div>
			</div>
		</>
	);
}

export default CertificateGenerateEventsList;
