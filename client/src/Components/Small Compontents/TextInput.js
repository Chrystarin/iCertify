import React from 'react';
import './../../Assets/Styles/Components/Small Components/SmallComponents.scss';
function TextInput(props) {

    return (
        <div id='LabelHolder'>
            <h5>{props.Title} :</h5>
            <input type="text" id='' placeholder={props.Holder} onInput={props.Action}/>
        </div>
    )
}

export default TextInput