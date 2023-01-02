import React from 'react'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button'

function EventCreate_Payment({StepValue,SetStepValue}) {
    function backStep(){
        if(StepValue !== 0){
            SetStepValue(StepValue-1);
        }
    }
  return (
    <div>
        <form action="#">
            <div className="Subject_Seperator">
                <div className="holder_Subject">
                    <h3>Price & Discount</h3>
                    <p>Assign the entrance fee for the event</p>
                </div>
                <div className="holder_Questions">
                    <div className="Wrapper_2_Inputs">
                        <TextField
                            label="With normal TextField"
                            id="outlined-start-adornment"
                            type="Number"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">₱</InputAdornment>,
                            }}
                        />
                        <TextField
                            label="Premium Membership Discount"
                            id="outlined-start-adornment"
                            type="Number"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">%</InputAdornment>,
                            }}
                        />
                    </div>
                </div>
            </div>
            <div id="Holder_Button">
                <Button variant="text">Save as draft</Button>
                <Button variant="outlined" onClick={backStep}>Back</Button>
                <Button variant="contained" >Submit</Button>
            </div>
        </form>
    </div>
  )
}

export default EventCreate_Payment