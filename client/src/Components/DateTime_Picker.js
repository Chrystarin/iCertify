import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function DateTime_Picker(props) {
  // const [DateTime, setDateTime] = useState(null);
  // const handleChange = (newValue) => {
  //   setDateTime(newValue);
  // };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label={props.Label}
        value={props.Value}
        onChange={props.HandleChange}
        renderInput={(params) => <TextField required {...params} />}
      />
    </LocalizationProvider>
  )
}

export default DateTime_Picker