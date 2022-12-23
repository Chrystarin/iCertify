import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';;

function DateTime_Picker(props) {
  // const [value, setValue] = useState(null);

  // const handleChange = (newValue) => {
  //   setValue(newValue);
  // };
  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label={props.Label}
        value={props.Value}
        onChange={props.handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}

export default DateTime_Picker