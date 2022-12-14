import React, {useState} from 'react';
import '../../Assets/Styles/Page/style-EventCreate.scss'

import Navigation from '../../Components/DashboardAdminNavigation/DashboardNavigationAdmin';
import HeaderNavigation from '../../Components/DashboardUserNavigation/HeaderNavigation';

import Input from '../../Components/Small Compontents/TextInput';
import TabBtn from '../../Components/Small Compontents/Button.js';


function EventCreate1() {
    let [openPanel,setopenPanel] = useState(1);
    return (
    <div id='DashboardHolder'>
        <div id="Navigation">
        <Navigation />
        </div>
        <div id="Holder_Content">
        <HeaderNavigation/>
        <div id="Content">
            <section id='Create_Event'>
                <div id='Container_Navigatoin_Creat_Event' >
                    <div  onClick={()=>setopenPanel(1)}>
                        <TabBtn Action="ButtonTab_Number" Type="Active_ButtonTab_Number" Number="1" Value="Event Details" Status={(openPanel===1)?"Active":"Inactive"}/>
                    </div>
                    <div onClick={()=>setopenPanel(2)}>
                        <TabBtn Action="ButtonTab_Number" Type="Active_ButtonTab_Number" Number="2" Value="Set Participants" Status={(openPanel===2)?"Active":"Inactive"}/>
                    </div>
                    <div onClick={()=>setopenPanel(3)}>
                        <TabBtn Action="ButtonTab_Number" Type="Active_ButtonTab_Number" Number="3" Value="Payment" Status={(openPanel===3)?"Active":"Inactive"}/>
                    </div>
                </div>
                <div id='Container_Form_Create_Event'>
                    <form>
                        <div id='Form1' className={(openPanel===1)? "Container_Form ActiveForm":"Container_Form InactiveForm"}>
                            <div className="Wrapper_Form_Create">
                                <div className="Wrapper_Title_Form">
                                    <h3>Event Details</h3>
                                    <p>Necessary Information for new event.</p>
                                </div>
                                <div className='Wrapper_Inputs_Form'>
                                    <Input Title="Event Type" Holder="Dianne"/>
                                </div>
                                <div className="Wrapper_Title_Form">
                                    <h3>Basic Details</h3>
                                    <p>Necessary Information for new event.</p>
                                </div>
                                <div className='Wrapper_Inputs_Form'>
                                    <Input Title="Event Name" Holder="Blockchain Technology 101"/>
                                    <Input Title="Event Description" Holder="Adding information about the evenT"/>
                                    <div className='Wrapper_3_Inputs'>
                                        <Input Title="Start Date & Time" Holder="10/3/2020 @ 4:10 PM"/>
                                        <Input Title="End Date & Time" Holder="10/3/2020 @ 4:10 PM"/>
                                        <Input Title="Search Tags" Holder="#Sample1, #Sample2,"/>
                                    </div>
                                    <div className='Wrapper_2_Inputs'>
                                        <Input Title="Email(Optional)" Holder="YourEmail@mail.com"/>
                                        <Input Title="Email(Optional)" Holder="YourEmail@mail.com"/>
                                    </div>
                                </div>
                            </div>
                            <div className='Wrapper_Button_Create'>
                                <div>
                                    <TabBtn Action="Function" BtnType="Primary2" Value="Save as Default"/>
                                </div>
                                <div onClick={()=>setopenPanel(2)}>
                                    <TabBtn onClick={()=>alert("")} Action="Function" BtnType="Primary" Value="Next"/>
                                </div>
                            </div>
                        </div>
                        <div className={(openPanel===2)? "Container_Form ActiveForm":"Container_Form InactiveForm"}>
                        <div className="Wrapper_Form_Create">
                                <div className="Wrapper_Title_Form">
                                    <h3>Participants</h3>
                                    <p>Assign participants</p>
                                </div>
                                <div className='Wrapper_Inputs_Form'>
                                    <Input Title="Event Type" Holder="Dianne"/>
                                </div>
                                
                            </div>
                            <div className='Wrapper_Button_Create'>
                                <div>
                                    <TabBtn Action="Function" BtnType="Primary2" Value="Save as Default"/>
                                </div>
                                <div onClick={()=>setopenPanel(3)}>
                                    <TabBtn onClick={()=>alert("")} Action="Function" BtnType="Primary" Value="Next"/>
                                </div>
                            </div>      
                        </div>
                        <div className={(openPanel===3)? "Container_Form ActiveForm":"Container_Form InactiveForm"}>
                            3   
                        </div>
                    </form>
                </div>
            </section>
        </div>
        </div>
    </div>
    )
}



export default EventCreate1;



