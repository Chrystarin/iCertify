import React from 'react'

function Select() {
    return (
        <FormControl fullWidth required  helperText="Select Event">
            <InputLabel id="demo-simple-select-label" required>Event Type</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={EventType} label="Event Type" onChange={handleChangeEvent}>
                <MenuItem value={"Online"}>Online</MenuItem>
                <MenuItem value={"Onsite"}>Onsite</MenuItem>
            </Select>
            <FormHelperText>Select event type</FormHelperText>
        </FormControl>
    )
}

export default Select