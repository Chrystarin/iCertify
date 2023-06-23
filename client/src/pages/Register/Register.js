import React, {useState} from 'react';

import logo from '../../images/iCertifyBranding/icertify_footer.png';
import Certificate from '../../images/Resources/Certificate.png';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './Register.scss'
import MetamaskImg from '../../images/Resources/Metamask.png'
import {useAuth} from "../../utils/AuthContext";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Modal from '@mui/material/Modal';
function Register() {
    // Constant Declarations;
    const { register } = useAuth();
    const [userType, setUserType] = useState();
    const [gender, setGender] = useState();
    const [termsCondition, setTermsCondition] = useState(false);

    const [openTermsNConditionModal, setOpenTermsNConditionModal] = useState(true);
   
    // Institution Registration Form
    const [institutionForm, setInstitutionForm] = useState({
        email: '',
        name: '',
        type: '',
        txHash: '',
    });

    // Member Registration Form
    const [memberForm, setMemberForm] = useState({
        email: '',
        firstName: '',
        middleName: '',
        lastName: '',
        birthDate: ''
    })
    
    // Retrieves data from text input then assigns to form
    function updateForm(e) {
        switch(userType){
            case 'user':
                return setMemberForm((prev) => {
                    const [key, value] = Object.entries(e)[0];
                    prev[key] = value;
                    return prev;
                });
            case 'institution':
                return setInstitutionForm((prev) => {
                    const [key, value] = Object.entries(e)[0];
                    prev[key] = value;
                    return prev;
                });
        }
    }

    // Register an Account
    const Register = async (e) => {
        e.preventDefault();
        register({
            userType : userType, 
            memberForm : memberForm, 
            institutionForm : institutionForm
        })
    }

    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };

    return (
        <div id='Signup'>
            <div id='Container_Signup'>
                <div id='Container_Signup_Content'>
                    <a id='Holder_GoBack_Button' href='/'>
                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.94 24.23"><defs><style></style></defs><g id="Path_382" data-name="Path 382"><polygon className="cls-1" points="12.11 24.23 0 12.11 12.11 0 14.94 2.83 5.66 12.11 14.94 21.4 12.11 24.23"/></g></svg>
                        <h5>Go back to Home</h5>
                    </a>
                    <div id='Container_Welcome'>
                        <h2>WELCOME TO</h2>
                        <img src={logo} alt="" id='LogoImg'/>
                    </div>
                    <h6>We provide online digital certificates through implementing NFT and Blockchain technology to ensure both employees and employers that their certificates are authentic and free from falsification.</h6>
                    <img id='Certificate' src={Certificate} alt="" />
                </div>
                <div id='Container_Signup_Panel'>
                    <div id='Container_Signup_Form'>
                        {!userType?<>
                            <div>
                                <h3>Get Started</h3>
                                <h5><span>Select</span> your role to <span>create</span> an account</h5>
                                <div id='RoleSelection'>
                                    <div className='RoleSelection__Container' onClick={()=>{setUserType("user")}}>
                                        <AssignmentIndIcon className='RoleSelection__Icon'/>
                                        <h6 id='RoleSelection__Title'>Member</h6>
                                    </div>
                                    <div className='RoleSelection__Container' onClick={()=>{setUserType("institution")}}>
                                        <ApartmentIcon className='RoleSelection__Icon'/>
                                        <h6 id='RoleSelection__Title'>Institution</h6>
                                    </div>
                                </div>
                            </div>
                        </>:<></>}
                        {userType==="user"?<>
                            <div>
                                <h3>Get Started</h3>
                                <h5><span>Setup</span> your profile and <span>Connect</span> your wallet </h5>
                                <form onSubmit={Register}>
                                    <div className='Wrapper_3_1_3'>
                                        <TextField 
                                            id="outlined-search" 
                                            label="First Name" 
                                            type="text" 
                                            required
                                            onChange={(e)=>updateForm({ firstName: e.target.value })}
                                        />
                                        <TextField 
                                            id="outlined-search" 
                                            label="Middle Name" 
                                            type="text" 
                                            onChange={(e)=>updateForm({ middleName: e.target.value })}
                                        />
                                        <TextField 
                                            id="outlined-search" 
                                            label="Last Name" 
                                            type="text" 
                                            required
                                            onChange={(e)=>updateForm({ lastName: e.target.value })}
                                        />
                                    </div>
                                    <div className='Wrapper_2_Inputs'>
                                        <TextField 
                                            InputLabelProps={{ shrink: true }}
                                            id="outlined-search" 
                                            label="Birthday"
                                            type="date"
                                            required 
                                            
                                            onChange={(e)=>{
                                                updateForm({ birthDate: e.target.value })
                                            }}
                                        />

                                        <TextField 
                                            id="outlined-search" 
                                            label="Email"
                                            type="email"
                                            required 
                                            onChange={(e)=>updateForm({ email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <input id='Submit' type="submit" value="Connect with Metamask"/>
                                        <a href="https://metamask.io/download/" id='MetamaskNote'>
                                            <p className='BodyText2'>Learn more about Metamask</p>
                                            <img src={MetamaskImg} alt="" />
                                        </a>
                                    </div>
                                    
                                </form>            
                            </div>
                        </>:<></>}
                        
                        {userType==="institution"?<>
                            <div>
                                <h3>Get Started</h3>
                                <h5><span>Setup</span> your Institution and <span>Connect</span> your wallet </h5>
                                <form onSubmit={Register}>
                                    <TextField 
                                        id="outlined-search" 
                                        label="Institution Name" 
                                        type="text" 
                                        required
                                        onChange={(e)=>updateForm({ name: e.target.value })}
                                    />
                                    <div className='Wrapper_2_Inputs'>
                                        <FormControl fullWidth required>
                                            <InputLabel id="demo-simple-select-label">Institution Type</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={institutionForm.type}
                                                label="Institution Type"
                                                onChange={(e)=>setInstitutionForm({...institutionForm, type: e.target.value})}
                                            >
                                                <MenuItem value={"organization"}>Organization</MenuItem>
                                                <MenuItem value={"school"}>School</MenuItem>
                                                <MenuItem value={"corporation"}>Corporation</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <TextField 
                                            id="outlined-search" 
                                            label="Email" 
                                            type="email"
                                            required 
                                            onChange={(e)=>updateForm({ email: e.target.value })}
                                        />
                                    </div>
                                    <div className={termsCondition?"TermsNCondition activeTermsNCondition":"TermsNCondition"}>
                                        <input required id='TermsCondition' type="checkbox"  />
                                        <label htmlFor='TermsCondition' onClick={()=>{setTermsCondition(!termsCondition)}}>
                                            <div>
                                            {termsCondition?<>
                                                <CheckBoxIcon/>
                                            </>:<>
                                                <CheckBoxOutlineBlankIcon/> 
                                            </>}
                                            </div>
                                            <p>I've read and agree to</p>
                                            <p className='TermsNCondition__Clicker' onClick={()=>{
                                                setOpenTermsNConditionModal(true);
                                            }}>Terms & Condition</p>
                                        </label>
                                        <Modal
                                            open={openTermsNConditionModal}
                                            onClose={()=>{setOpenTermsNConditionModal(false)}}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <div className='TermsNCondition__Modal Panel__Container'>
                                                
                                                <ul className='TermsNCondition__Container'>
                                                    <li>
                                                        <h2 className='TermsNCondition__Title'>Terms and Conditions for iCertify </h2>
                                                        <h6 className='TermsNCondition__SubTitle'>Please read these terms and conditions carefully before using iCertify. By accessing or using iCertify, you acknowledge and agree to comply with these terms and conditions. </h6>
                                                    </li>
                                                    <li>
                                                        <h6 className='TermsNCondition__TitleList'>1 Acceptance of Terms </h6>
                                                        <p>1.1. By accessing or using iCertify, you agree to be bound by these terms and conditions, as well as any additional terms and conditions, policies, or guidelines referenced herein.</p>
                                                        <p>1.2. If you do not agree to these terms and conditions, please refrain from accessing or using iCertify. </p>
                                                    </li>
                                                    <li>
                                                        <h6 className='TermsNCondition__TitleList'>User Eligibility </h6>
                                                        <p>2.1. iCertify is intended for use by individuals who are 18 years of age or older. By accessing or using iCertify, you represent and warrant that you are 18 years of age or older. </p>
                                                        <p>2.2. If you are accessing or using iCertify on behalf of an institution, you represent and warrant that you have the necessary authority to bind the institution to these terms and conditions. </p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </Modal>
                                    </div>
                                    <div>
                                        <input id='Submit' type="submit" value="Connect with Metamask"/>
                                        <a href="https://metamask.io/download/" id='MetamaskNote'>
                                            <p className='BodyText2'>Learn more about Metamask</p>
                                            <img src={MetamaskImg} alt="" />
                                        </a>
                                    </div>
                                </form>            
                            </div>
                        </>:<></>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register