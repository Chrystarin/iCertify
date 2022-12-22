import React,{useState} from 'react'
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function Tags(props) {
    const [Tags, setTags] = useState();
    return (
        <Autocomplete
            multiple
            id="tags-outlined"
            options={props.PredefinedTags.map((option) => option)}
            freeSolo
            renderTags={(value, getTagProps) =>
            value.map((option, index) => (
                // Inputs
                <Chip variant="filled" label={option} {...getTagProps({ index })} />
            ))
            }
            onChange={(option, index) => setTags(index)}
            renderInput={(params) => (
            <TextField
                {...params}
                label="Event Tags"
                placeholder="Tags"
                
            />
            )}
        />
    )
}

export default Tags