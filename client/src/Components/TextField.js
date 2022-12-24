import React,{useState} from 'react';
function TextField({Value,setValue}) {

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <TextField
        id="outlined-name"
        label="Name"
        value={Value}
        onChange={handleChange}
        />
    )
}

export default TextField