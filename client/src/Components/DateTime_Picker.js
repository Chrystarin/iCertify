import React, {useState} from 'react'
import TextField from '@mui/material/TextField';

function DateTime_Picker({Label,Value,SetValue}) {
  return (
    <TextField
      id="datetime-local"
      label={Label}
      type="datetime-local"
      defaultValue="2017-05-24T10:30"
      value={Value}
      onChange={(e)=> {SetValue(e.target.value)}}
      InputLabelProps={{
        shrink: true,
      }}
    />
  )
}

export default DateTime_Picker