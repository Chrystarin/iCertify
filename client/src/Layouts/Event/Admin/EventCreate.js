import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import '../../../Assets/Styles/Page/style-EventCreate.scss'

import TabBtn from '../../../Components/Button.js';
import TextField from '@mui/material/TextField';

// Dropdown
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';


//datePicker

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
export default function EventCreate() {

    // Event type
     
    const [EventType, setEventType] = React.useState('');
    const handleChangeEvent = (event) => {
      setEventType(event.target.value);
    };
    
    function EventTypeChecker(props){
        switch(props.EventType) {
            case 'Online':
                return <TextField id="outlined-search" label="link" type="text" required/>

            case 'Onsite':
                return <TextField id="outlined-search" label="link" type="text" required/>
            default:
                return 
        }
    }
    // End

    // start Time and Date
    const [StartDateTime, setStartDateTime] = React.useState(null);
    
    const handleChangeStartDateTime = (newValue) => {
        setStartDateTime(newValue);
    };
    // End
    // End Time and Date
    const [EndDateTime, setEndDateTime] = React.useState(null);
    
    const handleChangeEndDateTime = (newValue) => {
        setEndDateTime(newValue);
    };
    // End
        
    // Tags

    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
        {
          title: 'The Lord of the Rings: The Return of the King',
          year: 2003,
        },
        { title: 'The Good, the Bad and the Ugly', year: 1966 },
        { title: 'Fight Club', year: 1999 },
        {
          title: 'The Lord of the Rings: The Fellowship of the Ring',
          year: 2001,
        },
        {
          title: 'Star Wars: Episode V - The Empire Strikes Back',
          year: 1980,
        },
        { title: 'Forrest Gump', year: 1994 },
        { title: 'Inception', year: 2010 },
        {
          title: 'The Lord of the Rings: The Two Towers',
          year: 2002,
        },
        { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
        { title: 'Goodfellas', year: 1990 },
        { title: 'The Matrix', year: 1999 },
        { title: 'Seven Samurai', year: 1954 },
        {
          title: 'Star Wars: Episode IV - A New Hope',
          year: 1977,
        },
        { title: 'City of God', year: 2002 },
        { title: 'Se7en', year: 1995 },
        { title: 'The Silence of the Lambs', year: 1991 },
        { title: "It's a Wonderful Life", year: 1946 },
        { title: 'Life Is Beautiful', year: 1997 },
        { title: 'The Usual Suspects', year: 1995 },
        { title: 'Léon: The Professional', year: 1994 },
        { title: 'Spirited Away', year: 2001 },
        { title: 'Saving Private Ryan', year: 1998 },
        { title: 'Once Upon a Time in the West', year: 1968 },
        { title: 'American History X', year: 1998 },
        { title: 'Interstellar', year: 2014 },
        { title: 'Casablanca', year: 1942 },
        { title: 'City Lights', year: 1931 },
        { title: 'Psycho', year: 1960 },
        { title: 'The Green Mile', year: 1999 },
        { title: 'The Intouchables', year: 2011 },
        { title: 'Modern Times', year: 1936 },
        { title: 'Raiders of the Lost Ark', year: 1981 },
        { title: 'Rear Window', year: 1954 },
        { title: 'The Pianist', year: 2002 },
        { title: 'The Departed', year: 2006 },
        { title: 'Terminator 2: Judgment Day', year: 1991 },
        { title: 'Back to the Future', year: 1985 },
        { title: 'Whiplash', year: 2014 },
        { title: 'Gladiator', year: 2000 },
        { title: 'Memento', year: 2000 },
        { title: 'The Prestige', year: 2006 },
        { title: 'The Lion King', year: 1994 },
        { title: 'Apocalypse Now', year: 1979 },
        { title: 'Alien', year: 1979 },
        { title: 'Sunset Boulevard', year: 1950 },
        {
          title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
          year: 1964,
        },
        { title: 'The Great Dictator', year: 1940 },
        { title: 'Cinema Paradiso', year: 1988 },
        { title: 'The Lives of Others', year: 2006 },
        { title: 'Grave of the Fireflies', year: 1988 },
        { title: 'Paths of Glory', year: 1957 },
        { title: 'Django Unchained', year: 2012 },
        { title: 'The Shining', year: 1980 },
        { title: 'WALL·E', year: 2008 },
        { title: 'American Beauty', year: 1999 },
        { title: 'The Dark Knight Rises', year: 2012 },
        { title: 'Princess Mononoke', year: 1997 },
        { title: 'Aliens', year: 1986 },
        { title: 'Oldboy', year: 2003 },
        { title: 'Once Upon a Time in America', year: 1984 },
        { title: 'Witness for the Prosecution', year: 1957 },
        { title: 'Das Boot', year: 1981 },
        { title: 'Citizen Kane', year: 1941 },
        { title: 'North by Northwest', year: 1959 },
        { title: 'Vertigo', year: 1958 },
        {
          title: 'Star Wars: Episode VI - Return of the Jedi',
          year: 1983,
        },
        { title: 'Reservoir Dogs', year: 1992 },
        { title: 'Braveheart', year: 1995 },
        { title: 'M', year: 1931 },
        { title: 'Requiem for a Dream', year: 2000 },
        { title: 'Amélie', year: 2001 },
        { title: 'A Clockwork Orange', year: 1971 },
        { title: 'Like Stars on Earth', year: 2007 },
        { title: 'Taxi Driver', year: 1976 },
        { title: 'Lawrence of Arabia', year: 1962 },
        { title: 'Double Indemnity', year: 1944 },
        {
          title: 'Eternal Sunshine of the Spotless Mind',
          year: 2004,
        },
        { title: 'Amadeus', year: 1984 },
        { title: 'To Kill a Mockingbird', year: 1962 },
        { title: 'Toy Story 3', year: 2010 },
        { title: 'Logan', year: 2017 },
        { title: 'Full Metal Jacket', year: 1987 },
        { title: 'Dangal', year: 2016 },
        { title: 'The Sting', year: 1973 },
        { title: '2001: A Space Odyssey', year: 1968 },
        { title: "Singin' in the Rain", year: 1952 },
        { title: 'Toy Story', year: 1995 },
        { title: 'Bicycle Thieves', year: 1948 },
        { title: 'The Kid', year: 1921 },
        { title: 'Inglourious Basterds', year: 2009 },
        { title: 'Snatch', year: 2000 },
        { title: '3 Idiots', year: 2009 },
        { title: 'Monty Python and the Holy Grail', year: 1975 },
    ];

    // +================================================================================


    const url = "http://localhost:6787/events/create"
    const navigate = useNavigate();
    
    let [openPanel,setopenPanel] = useState(1);

    const [form, setForm] = useState({
        eventId: '',
        type: '',
        title: '',
        description: '',
        link: '',
        location: '',
        date:{
            start: '',
            end: ''
        },
        canClaimDocument: '',
        status: '',
        isAcceptingVolunteer: '',
        tags: ''
    });

    // These methods will update the state properties.
    function updateForm(e) {
        return setForm((prev) => {
            const [key, value] = Object.entries(e)[0];

            // Identify if toChange is date
            if(key == 'date') {
                const [dateType, date] = Object.entries(value)[0];

                prev[key][dateType] = date;
            } else {
                prev[key] = value;
            }

            console.log(prev);
            console.log(form);
            return prev;
            
    });}

     // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();
    
        form.date.start = Number(form.date.start);
        form.date.end = Number(form.date.end);
        form.canClaimDocument = form.canClaimDocument == 'true' ? true : false;
        form.isAcceptingVolunteer = form.isAcceptingVolunteer == 'true' ? true : false;
        form.tags = form.tags ? [] : [form.tags];

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newEvent = { ...form };
    
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEvent),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            navigate(`/events/${data.eventId}`);
            console.log("Submitted")
        })
        .catch(error => {
            
            console.log("Error:" + error);
            return;
        });
    }
    
    




    return (
        
        <section id='Create_Event'>
            <div id='Container_Navigatoin_Creat_Event' >
                <div  onClick={()=>setopenPanel(1)}>
                    <TabBtn Action="ButtonTab_Number" Type="Active_ButtonTab_Number" Number="1" Value="Event Details" Status={(openPanel===1)?"Active":"Inactive"}/>
                </div>
                <div onClick={()=>setopenPanel(2)}>
                    <TabBtn Action="ButtonTab_Number" Type="Active_ButtonTab_Number" Number="2" Value="Set Participants" Status={(openPanel===2)?"Active":"Inactive"}/>
                </div>
                <div onClick={()=>setopenPanel(3)}>
                    <TabBtn Action="ButtonTab_Number" Type="Active_ButtonTab_Number" Number="3" Value="Payment" Status={(openPanel===3)?"Active":"Inactive"}/>
                </div>
            </div>
            <div id='Container_Form_Create_Event'>
                <form onSubmit={(e)=>onSubmit(e)}>
                    <div id='Form1' className={(openPanel===1)? "Container_Form ActiveForm":"Container_Form InactiveForm"}>
                        <div className="Wrapper_Form_Create">
                            <div className="Wrapper_Title_Form">
                                <h3>Event Details</h3>
                                <p>Necessary Information for new event.</p>
                            </div>
                            <div className='Wrapper_Inputs_Form'>
                                <div className="Wrapper_2_Inputs">
                                    <FormControl fullWidth required  helperText="Select Event">
                                        <InputLabel id="demo-simple-select-label" required>Event Type</InputLabel>
                                        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={EventType} label="Event Type" onChange={handleChangeEvent}>
                                            <MenuItem value={"Online"}>Online</MenuItem>
                                            <MenuItem value={"Onsite"}>Onsite</MenuItem>
                                        </Select>
                                        <FormHelperText>Select event type</FormHelperText>
                                    </FormControl>
                                    <EventTypeChecker EventType={EventType}/>
                                </div>
                            </div>
                            <div className="Wrapper_Title_Form">
                                <h3>Basic Details</h3>
                                <p>Necessary Information for new event.</p>
                            </div>
                            <div className='Wrapper_Inputs_Form'>

                                <TextField id="outlined-search" label="Event Name" type="text" required  />
                                <TextField id="outlined-search" label="Event Description" type="text" required multiline/>
                                <div className='Wrapper_3_Inputs'>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                        label="Start Date & Time"
                                        value={StartDateTime}
                                        onChange={handleChangeStartDateTime}
                                        renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                        label="End Date & Time"
                                        value={EndDateTime}
                                        onChange={handleChangeEndDateTime}
                                        renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                    <Autocomplete
                                        multiple
                                        id="tags-outlined"
                                        options={top100Films.map((option) => option.title)}
                                        defaultValue={[top100Films[13].title]}
                                        freeSolo
                                        renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                            <Chip variant="filled" label={option} {...getTagProps({ index })} />
                                        ))
                                        }
                                        renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Event Tags"
                                            placeholder="Tags"
                                        />
                                        )}
                                    />
                                    
                                </div>


                                {/* <Input Title="Event Name" Holder="Blockchain Technology 101" Action={(e)=>updateForm({ title: e.target.value })}/>
                                <Input Title="Event Description" Holder="Adding information about the evenT" Action={(e)=>updateForm({ description: e.target.value })}/>
                                <Input Title="Link" Holder="www.test.com" Action={(e)=>updateForm({ link: e.target.value })}/>
                                <Input Title="Location" Holder="Marikina" Action={(e)=>updateForm({ location: e.target.value })}/>
                                <Input Title="Can Claim Document" Holder="www.test.com" Action={(e)=>updateForm({ canClaimDocument: e.target.value })}/>
                                <Input Title="Status" Holder="www.test.com" Action={(e)=>updateForm({ status: e.target.value })}/>
                                <Input Title="Accepting Volunteers" Holder="true" Action={(e)=>updateForm({ isAcceptingVolunteer: e.target.value })}/>
                                
                                <div className='Wrapper_3_Inputs'>
                                    <Input Title="Start Date & Time" Holder="10/3/2020 @ 4:10 PM" Action={(e)=>updateForm({ date:{start: e.target.value}})}/>
                                    <Input Title="End Date & Time" Holder="10/3/2020 @ 4:10 PM" Action={(e)=>updateForm({ date:{end: e.target.value}})}/>
                                    <Input Title="Search Tags" Holder="#Sample1, #Sample2,"/>
                                </div>
                                
                                <div className='Wrapper_2_Inputs'>
                                    <Input Title="Email(Optional)" Holder="YourEmail@mail.com"/>
                                    <Input Title="Email(Optional)" Holder="YourEmail@mail.com"/>
                                </div> */}
                            </div>
                        </div>
                        <div className='Wrapper_Button_Create'>
                            <div>
                                <TabBtn Action="Function" BtnType="Primary2" Value="Save as Default"/>
                            </div>
                            <div onClick={()=>setopenPanel(2)}>
                                <TabBtn Action="Function" BtnType="Primary" Value="Next"/>
                            </div>
                        </div>
                    </div>
                    <div className={(openPanel===2)? "Container_Form ActiveForm":"Container_Form InactiveForm"}>
                    <div className="Wrapper_Form_Create">
                            <div className="Wrapper_Title_Form">
                                <h3>Participants</h3>
                                <p>Assign participants</p>
                            </div>
                            <div className='Wrapper_Inputs_Form'>
                                {/* <Input Title="Event Type" Holder="Dianne"/> */}
                            </div>
                            
                        </div>
                        <div className='Wrapper_Button_Create'>
                            <div>
                                <TabBtn Action="Function" BtnType="Primary2" Value="Save as Default"/>
                            </div>
                            <div onClick={()=>setopenPanel(3)}>
                                <TabBtn onClick={()=>alert("")} Action="Function" BtnType="Primary" Value="Next"/>
                            </div>
                        </div>      
                    </div>
                    <div className={(openPanel===3)? "Container_Form ActiveForm":"Container_Form InactiveForm"}>
                        <TabBtn type="submit" variant="contained" onClick={(e)=>onSubmit(e)} BtnType="Primary" Value="Create"/>   
                    </div>
                </form>
            </div>
        </section>
    )
}
