import React from 'react';
import './../Assets/Styles/Components/Small Components/SmallComponents.scss';
function TextInput(props) {
    return (
        <div className='Input'>
            <input 
                type={props.type}
                id={props.id} 
                onInput={props.Action} 
                value={props.value}
                required={props.required}
            />
            <label for={props.id} className='Label'>{props.Title} :</label>
        </div>
    )
}

export default TextInput