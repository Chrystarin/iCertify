import React,{useState, useEffect} from 'react';
import './EventsAdmin.scss';

import Analytics from '../../../layouts/Event/Admin/EventAnalytics'
import Card from '../../../components/Card/Card.js';

import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Button from '@mui/material/Button';
import axios from '../../../config/axios';

import SearchInput from '../../../components/SearchParticipant_EventCreate/SearchParticipant_EventCreate';
function EventsAdmin() {
    const [isOpenPanel_Events , setIsOpenPanel_Events] = useState("All");
    

    return (
        <div id='AdminDasboard'>
            <section id='institutions'>
                <div className='Title__Div'>
                    <h2 className='SectionTitle'>Document Offered</h2>
                    <h5 className='SectionSubTitle'>Collection of Available Documents</h5>
                </div>
                
                <div className='Navigation_Institution'>
                    <div className='Navigation_Left'>
                        <SearchInput/>
                    </div>
                    <div className='Navigation_Right'>
                        <IconButton aria-label="delete" >
                            <FilterAltIcon />
                        </IconButton>
                        <Button variant="contained"  href='/a/events/create'>Add Document</Button>
                    </div>
                </div>
                <div id='Panel_Events'>
                    <Panel_Events open={isOpenPanel_Events}/>
                </div>
            </section>
            <div>
                <Analytics/>
            </div>
        </div>
    )
}

function Panel_Events(props){
    return <h1>Hello</h1>
};




export default EventsAdmin;
