import React from 'react';
import './../Assets/Styles/Components/Small Components/SmallComponents.scss';
function TextInput(props) {
    return (
        <div id='Input'>
            <span>{props.Title} :</span>
            <input 
                type={props.type}
                id={props.id} 
                onInput={props.Action} 
                value={props.value}
                required={props.required}
            />
        </div>
    )
}

export default TextInput