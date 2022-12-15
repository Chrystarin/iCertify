import React from 'react';
import './../../Assets/Styles/Components/Small Components/SmallComponents.scss';
function TextInput(props) {
    let InputTitle = props.Title;
    let InputSample = props.Holder;  
    let InputAction = props.Action;
    return (
        <div id='LabelHolder'>
            <h5>{InputTitle} :</h5>
            <input type={props.Type} id='' placeholder={InputSample} onInput={InputAction}/>
        </div>
    )
}

export default TextInput