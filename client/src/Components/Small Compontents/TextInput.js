import React from 'react';
import './../../Assets/Styles/Components/Small Components/SmallComponents.scss';
function TextInput(props) {

    return (
        <div id='LabelHolder'>
            <h5>{props.Title} :</h5>
            <input 
                type={props.type}
                id={props.id} 
                placeholder={props.Holder} 
                onInput={props.Action} 
                value={props.value}
                required={props.required}
            />
        </div>
    )
}

export default TextInput