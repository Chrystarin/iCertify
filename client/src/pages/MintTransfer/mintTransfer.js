import React, {useState} from 'react';
import './MintTransfer.scss';
import './../../styles/Main.scss'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchInput from '../../components/SearchInput/SearchInput';

import MintTransferCard from '../../components/MintTransferCard/MintTransferCard';

import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import SelectEvent from '../../layouts/MintTransfer/SelectEventPanel';


function MintTransfer() {
  const [TabActive, setTabActive] = useState("Pending");
  function TabView(){
    switch (TabActive) {
      case "Pending":
        return <>
          <MintTransferCard Status="Pending"/>
          <MintTransferCard Status="Pending"/>
          <MintTransferCard Status="Pending"/>
          <MintTransferCard Status="Pending"/>
          <MintTransferCard Status="Pending"/>
        </>
        break;
      case "OnProgress":
        return <>
          <MintTransferCard/>
          <MintTransferCard/>
          <MintTransferCard/>
          <MintTransferCard/>
          <MintTransferCard/>
          <MintTransferCard/>
          <MintTransferCard/>
        </>
        break;
      case "Complete":
        return <>
          <MintTransferCard/>
          <MintTransferCard/>
          <MintTransferCard/>
          <MintTransferCard/>
          <MintTransferCard/>
        </>
        break;
      default:
        break;
    }
  }

  return ( <>
    <div className='AdminPanelContainer'>
      <section id='MintNTransfer'>
        <div id='Header'>
          <SelectEvent/>
          <div className='MintNTransfer__Wrapper'>
            <div className='Title__Div'>
              <h2 className='SectionTitle'>Mint & Transfer</h2>
              <h5 className='SectionSubTitle'>Organize Certificate Requests</h5>

              <div className='InfoLeft__Div'>
                <div className="Pending__VerifiedRequest__Container">
                  <h4>25</h4> 
                  <h6>Pending Request</h6>
                </div>
                <div className="Pending__VerifiedRequest__Container">
                  <h4>25</h4> 
                  <h6>Complete</h6>
                </div>
              </div>
            </div>
            <div className='InfoRight__Div'>
              <div id='InfoRight__Wrapper'>
                <div id='EventStatus__Div'>
                  <h6 className='HeaderTitle'>Event Status</h6>
                  <h6>Ended in 3 days</h6>
                </div>
                <div id='Organizers__Div'>
                  <div>
                    <h6 className='HeaderTitle'>Organizers</h6>
                    <div className='AvatarGroupWithLabel'>
                      <AvatarGroup max={3} sx={{'& .MuiAvatar-root': { width: 24, height: 24, fontSize: 15 },}}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                      </AvatarGroup>
                    </div>
                  </div>
                </div>
                <div id='Participants__Div'>
                  <div>
                    <h6 className='HeaderTitle'>Participants</h6>
                    <div className='AvatarGroupWithLabel'>
                      <AvatarGroup max={3} sx={{'& .MuiAvatar-root': { width: 24, height: 24, fontSize: 15 },}}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                      </AvatarGroup>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            
          </div>
        </div>
        <div id='Body'>
          <div id="TabsNav">
            <Button variant={(TabActive==="Pending")?"contained":"text"} onClick={()=>setTabActive("Pending")}>Pending</Button>
            <Button variant={(TabActive==="OnProgress")?"contained":"text"} onClick={()=> setTabActive("OnProgress") }>On Progress</Button>
            <Button variant={(TabActive==="Complete")?"contained":"text"} onClick={()=> setTabActive("Complete") }>Complete</Button>
          </div>
          <div id='TabsView'>
            <div id='ListTools'>
              <div id='SearchInputHolder'>
                <SearchInput/>
              </div>
              <IconButton>
                <FilterAltIcon />
              </IconButton>
            </div>
            <div className='Wrapper__Card'>
              <TabView/>
            </div>
          </div>
        </div>
      </section>
      <div id='SideContent'>
        <div className='Panel__Container'>
          <h5>Attendance Sheet</h5>
        </div>
        <div className='Panel__Container'>
          <h5>Analytics</h5>
        </div>
      </div>
    </div>
  </>

  )
}

export default MintTransfer;