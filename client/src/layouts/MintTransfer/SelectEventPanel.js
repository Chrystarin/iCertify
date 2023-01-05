import React,{useState} from 'react';
import './SelectEventPanel.scss';

import Card from '../../components/Card/Card';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function SelectEvent(props) {
  const {title} = props;
  const [Dropdown,setDropdown] = useState(false);
  return (
    <>
        <div id='SelectEvent'>
            <div id="Select__Div" onClick={()=> setDropdown(!Dropdown)}>
                <h5  id='EventTitle'>{title}</h5>
                <ExpandLessIcon/>
            </div>
            <div id='SelectDropDown' className={Dropdown?"Panel__Container SelectDropDownActive": "Panel__Container SelectDropDownInactive"}>
              <h3 id='SelectDropDown_h3'>Events to manage</h3>
              <h5 id='SelectDropDown_h5'>Choose Event to manage</h5>
              <div className='Wrapper__Card' >
                <Card cardType="Admin"/>
                <Card cardType="Admin"/>
                <Card cardType="Admin"/>
                <Card cardType="Admin"/>
              </div>
            </div>
        </div>
    </>
  )
}

export default SelectEvent