import React, {useState} from 'react';
import { useNavigate } from "react-router";

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import Button from '@mui/material/Button'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FormHelperText from '@mui/material/FormHelperText';
import Tags from '../../../components/Tags.js';

function EventCreate_EventDetails({StepValue,SetStepValue}) {

 // Tags Predifined for help searching
  const PredefinedTags = [ "Computer","Technology", "Blockchain", "Entertainment","UserInterface","UserExperience"]; 
  const url = "http://localhost:6787/events/create"
  const navigate = useNavigate();

  // +================================================================================
  //                      GET VALUES FROM SET Event Details INPUT FORM
  
  let TagsVal = [];

  const [EventTypeVal, setEventTypeVal] = useState('');
  const [startDateTimeVal, setstartDateTimeVal] = useState(null);
  const [endDateTimeVal, setendDateTimeVal] = useState(null);
  const [form, setForm] = useState({
      eventId: '',
      type: '',
      title: '',
      description: '',
      link: '',
      location: 'location',
      date:{
          start: '',
          end: ''
      },
      canClaimDocument: '',
      status: '',
      tags: ['']
  });

  // Event Type
  const EventTypehandleChangeEvent = (event) => {
    setEventTypeVal(event.target.value);
    setForm({
      ...form,
      type:event.target.value
    });
  };

  // Tags 
  function TagsValHandleChange(option, index){
    TagsVal = index;
    setForm({
      ...form,
      tags: TagsVal
    });
  }

  // Start Date and Time
  const startDateTimeValhandleChange = (newValue) => {
    setstartDateTimeVal(newValue);
    setForm(prevState => ({
      ...form,
      date:{
        ...prevState.date,
        start: Date.parse(newValue)
      }
    }));
  };

  // End Date and Time
  const endDateTimeValhandleChange = (newValue) => {
    setendDateTimeVal(newValue);
    setForm(prevState => ({
      ...form,
      date:{
        ...prevState.date,
        end: Date.parse(newValue)
      }
    }));
  };

  // Button Next
  function nextStep(){
    if(StepValue !== 2){
      SetStepValue(StepValue+1);
    } 
  }

  // These methods will update the form data
  function updateForm(e) {
      return setForm((prev) => {
          const [key, value] = Object.entries(e)[0];
          prev[key] = value;
          console.log(form);
          return prev;
  });}

  function validateFormData(){
    form.type = form.type.toLowerCase();
    form.date.start = Number(form.date.start);
    form.date.end = Number(form.date.end);
    form.canClaimDocument = form.canClaimDocument == 'on' ? true : false;
    form.tags = form.tags ? [] : [form.tags];
    console.log("data validated");
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    validateFormData();

    form.status = "active";

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
        // navigate(`/events/${data.eventId}`);
        console.log("Submitted")
    })
    .catch(error => {
        console.log("Error:" + error);
        return;
    });

    nextStep();
  }

  // +================================================================================

  return (
    <form onSubmit={(e)=>onSubmit(e)}>
        <div className="Subject_Seperator">
          <div className="holder_Subject">
              <h3>Event Type</h3>
              <p>Necessary Information for new event.</p>
          </div>
          <div className="holder_Questions">
              <div className="Wrapper_2_Inputs">
                  <FormControl fullWidth required  helpertext="Select Event">
                      <InputLabel id="demo-simple-select-label" required>Event Type</InputLabel>
                      <Select labelId="demo-simple-select-label" id="demo-simple-select" value={EventTypeVal} label="Event Type" onChange={EventTypehandleChangeEvent}>
                          <MenuItem value={"Online"}>Online</MenuItem>
                          <MenuItem value={"Onsite"}>Onsite</MenuItem>
                      </Select>
                      <FormHelperText>Select event type</FormHelperText>
                  </FormControl>
                  {EventTypeVal == '' ? '' : 
                    (EventTypeVal == 'Online' ? (
                      <TextField 
                        id="outlined-search" 
                        label="Link" 
                        type="text" 
                        required 
                        onChange={(e) => updateForm({link: e.target.value})}
                      />
                    ) : (
                      <TextField 
                        id="outlined-search" 
                        label="Location" 
                        type="text" 
                        required 
                        onChange={(e) => updateForm({location: e.target.value})}
                      />
                    ))
                  }
              </div>
          </div>
      </div>
      <div className="Subject_Seperator">
          <div className="holder_Subject">
              <h3>Basic Details</h3>
              <p>Necessary Information for new event.</p>
          </div>
          <div className="holder_Questions">
              <TextField 
                id="outlined-search" 
                label="Event Name" 
                type="text" 
                required
                onChange={(e) => updateForm({title: e.target.value})}
              />
              <TextField 
                id="outlined-search" 
                label="Event Description" 
                type="text" 
                required 
                multiline
                onChange={(e) => updateForm({description: e.target.value})}
              />
              <div className='Wrapper_2_1_Inputs'>   
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Start Date & Time"
                    value={startDateTimeVal}
                    onChange={startDateTimeValhandleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="End Date & Time"
                    value={endDateTimeVal}
                    onChange={endDateTimeValhandleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <Tags PredefinedTags={PredefinedTags} HandleChange={TagsValHandleChange}/>
              </div>
              <div >
                <FormControlLabel control={<Switch defaultChecked />} label="Certificate" onChange={(e) => updateForm({canClaimCertificate: e.target.value})}/>
              </div>
          </div>
      </div>
      <div id="Holder_Button">
          {/* <Button variant="outlined">Back</Button>
          <Button variant="text">Save as draft</Button> */}
          <Button variant="contained" onClick={(e)=>onSubmit(e)} endIcon={<NavigateNextIcon/>}>Next</Button>
      </div>
    </form>
  )
}

export default EventCreate_EventDetails