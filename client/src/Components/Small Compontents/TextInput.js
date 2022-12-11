import React from 'react';
import './../../Assets/Styles/Components/Small Components/SmallComponents.scss';
function TextInput(props) {

    
    let InputTitle = props.Title;
    let InputSample = props.Holder;  
    return (
        <div id='LabelHolder'>
            <h5>{InputTitle} :</h5>
            <input type="text" id='' placeholder={InputSample}/>
        </div>
    )
}

export default TextInput