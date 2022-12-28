import React, {useState} from 'react';

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




import FormHelperText from '@mui/material/FormHelperText';
import Tags from '../../../Components/Tags.js';

function EventCreate_EventDetails({StepValue,SetStepValue}) {


 // Tags Predifined for help searching
 const PredefinedTags = [ "Computer","Technology", "Blockchain", "Entertainment","UserInterface","UserExperience"]; 

  // +================================================================================
  //                      GET VALUES FROM SET Event Details INPUT FORM
  //  EVENT TYPE

  const [EventTypeVal, setEventTypeVal] = useState('');
  const EventTypehandleChangeEvent = (event) => {
    setEventTypeVal(event.target.value);
  };

  // TAGS 
  let TagsVal = [];
  function TagsValHandleChange(option, index){
    TagsVal = index;
  }
  // START DATE & TIME
  const [startDateTimeVal, setstartDateTimeVal] = useState(null);

  const startDateTimeValhandleChange = (newValue) => {
    setstartDateTimeVal(newValue);
  };
  const [endDateTimeVal, setendDateTimeVal] = useState(null);

  const endDateTimeValhandleChange = (newValue) => {
    setendDateTimeVal(newValue);
  };
  // +================================================================================

  // Button Next
  function nextStep(){
    if(StepValue !== 2){
      SetStepValue(StepValue+1);
    } 
    // Validation and Submition
  }

  
  // Event Type Setter

  function EventTypeChecker(props){
    switch(props.EventType) {
        case 'Online':
            return <TextField id="outlined-search" label="link" type="text" required />

        case 'Onsite':
            return <TextField id="outlined-search" label="Address" type="text" required />
        default:
            return 
    }
  }

  return (
    <form action="#">
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
                  <EventTypeChecker EventType={EventTypeVal}/>
              </div>
          </div>
      </div>
      <div className="Subject_Seperator">
          <div className="holder_Subject">
              <h3>Basic Details</h3>
              <p>Necessary Information for new event.</p>
          </div>
          <div className="holder_Questions">
              <TextField id="outlined-search" label="Event Name" type="text" required />
              <TextField id="outlined-search" label="Event Description" type="text" required multiline/>
              <div className="Wrapper_2_Inputs">
                  <TextField id="outlined-search" label="Email" type="email" />
                  <TextField id="outlined-search" label="Contact Number" type="tel"/>
              </div>
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
                <FormControlLabel control={<Switch defaultChecked />} label="Certificate" />
              </div>
          </div>
      </div>
      <div id="Holder_Button">
          {/* <Button variant="outlined">Back</Button>
          <Button variant="text">Save as draft</Button> */}
          <Button variant="contained" onClick={nextStep}>Next</Button>
      </div>
    </form>
  )
}

export default EventCreate_EventDetails