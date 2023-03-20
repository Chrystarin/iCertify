import React,{useState, useEffect} from 'react';


import Analytics from '../../layouts/Event/Admin/EventAnalytics'
import Card from '../../components/Card/Card.js';

import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Button from '@mui/material/Button';
import axios from '../../config/axios';
import DocumentRequestCard from '../../components/Card/DocumentRequestCard';
import SearchInput from '../../components/SearchParticipant_EventCreate/SearchParticipant_EventCreate';
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
                    <AvailableDocuments/>
                </div>
            </section>
            <div>
                <Analytics/>
            </div>
        </div>
    )
}



function AvailableDocuments(){
    
    const AvailableDocuments = [
        {name:'Transcript of Records', id:"213231323132", 
        description:'Document that lists all the courses taken by a student and the grades or marks earned in each course, usually issued by the institution attended. It serves as an official record of the students academic history.', 
        requirements:[
            "Student Graduate", "Student ID", "Student Number"
        ], 
        requestStatus: true},
        
        {name:'Transcript of Records', 
        id:"213231323132", 
        description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis, ea laboriosam praesentium consequuntur eveniet animi quasi quam eaque. Molestias commodi rerum fuga sint obcaecati inventore, nulla ullam cumque at quibusdam.', 
        requirements:[
            "Student Graduate", "Student ID", "Student Number"
        ], 
        requestStatus: true},
        {name:'Transcript of Records', id:"213231323132", 
        description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis, ea laboriosam praesentium consequuntur eveniet animi quasi quam eaque. Molestias commodi rerum fuga sint obcaecati inventore, nulla ullam cumque at quibusdam.', 
        requirements:[
            "Student Graduate", "Student ID", "Student Number"
        ], 
        requestStatus: true},
        
        {name:'Transcript of Records', 
        id:"213231323132", 
        description:'Lorem ipsum, dolor sipraesentium consequuntur eveniet animi quasi quam eaque. Molestias commodi rerum fuga sint obcaecati inventore, nulla ullam cumque at quibusdam.', 
        requirements:[
            "Student Graduate", "Student ID", "Student Number"
        ], 
        requestStatus: true},
        {name:'Transcript of Records', id:"213231323132", 
        description:'Lorem ipsum, dolor site at quibusdam.', 
        requirements:[
            "Student Graduate", "Student ID", "Student Number"
        ], 
        requestStatus: true},
        {name:'Transcript of Records', 
        id:"213231323132", 
        description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis, ea laboriosam praesentium consequuntur eveniet animi quasi quam eaque. Molestias commodi rerum fuga sint obcaecati inventore, nulla ullam cumque at quibusdam.', 
        requirements:[
            "Student Graduate", "Student ID", "Student Number"
        ], 
        requestStatus: true},   
        {name:'Transcript of Records', id:"213231323132", 
        description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis, ea laboriosam praesentium consequuntur eveniet animi quasi quam eaque. Molestias commodi rerum fuga sint obcaecati inventore, nulla ullam cumque at quibusdam.', 
        requirements:[
            "Student Graduate", "Student ID", "Student Number"
        ], 
        requestStatus: true},
        {name:'Transcript of Records', id:"213231323132", 
        description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis, ea laboriosam praesentium consequuntur eveniet animi quasi quam eaque. Molestias commodi rerum fuga sint obcaecati inventore, nulla ullam cumque at quibusdam.', 
        requirements:[
            "Student Graduate", "Student ID", "Student Number"
        ], 
        requestStatus: true},
        // {name:'', description:'', requirements:'', requestStatus: true},
    ]
    return<>
        <div className="InstitutionBody__Content__Containers">
            <div className='grid'>
                {AvailableDocuments.map((Document) => (
                    <DocumentRequestCard name={Document.name} id={Document.id} description={Document.description} requirements={Document.requirements} requestStatus={document.requestStatus}/>
                ))}
            </div>
        </div>
    </>
}


export default EventsAdmin;
