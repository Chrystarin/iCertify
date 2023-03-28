import React,{useState} from 'react'
import Button from '@mui/material/Button';
import { Avatar } from '@mui/material';
import './CreateDocument.scss';
import DocumentImg from '../../images/Resources/Certificate.png'
import UploadFileImage from './../../images/Resources/Design/UploadFile.png'
import Chip from '@mui/material/Chip';
import SearchInput from '../../components/SearchInput/SearchInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';


function CreateDocument() {
    const [selectDocument, setSelectDocument] = React.useState('');
    const handleChangeSelectDocument = (event) => {
        setSelectDocument(event.target.value);
      };
    const [CreateDocumentValue, setcreateDocumentValue] = useState(
        {
            DocumentImage:null,
            
        }
    );


    return <>
        <form id='AdminDasboard'>
            <section id='CreateDocument'>
                <div id='CreateDocument__Container'> 
                    {
                        CreateDocumentValue.DocumentImage === null?
                        <>
                        <div id='uploadDocument__Container'>
                            <input type="file" name='uploadDocument' id='uploadDocument' className='hidden'/> 
                            <label htmlFor="uploadDocument" id='uploadDocument__Click'>
                                <img src={UploadFileImage} alt="" />
                                <div>
                                    <p className='BodyText3'>Upload any proof of membership</p>
                                    <h5>Click to upload a file</h5>
                                </div>
                            </label>
                        </div>
                            
                        </>
                        :
                        <>
                            <img id='CreateDocument__Image' src={DocumentImg} alt="" />
                        </>
                    }
                    
                    
                </div>
            </section>
            <div id='SidePanel'>
                <div id='SidePanel__Info' className='Panel__Container'>
                    {true?<>
                        <div id='SidePanel__Requestor'>
                            <a href="/">
                                <Avatar id="SidePanel__Requestor__Avatar"/>
                                <h5>Dianne Chrystalin Brandez</h5>
                            </a>
                            <Chip id="SidePanel__Requestor__Chip" label="# 02000069502" variant="outlined" onClick={()=>{}} />
                        </div>
                        <div id='SidePanel__Date'>
                        <h6>Expected Date</h6>
                        <p>October 25 - 30 , 2023 </p>
                        </div>
                        <div id='SidePanel__DocumentDetails'>
                            <div>
                                <h6>Document Name :</h6>
                                <p>Transcript of Record </p>
                            </div>
                            <div>
                                <h6>Document Decscription :</h6>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda cum reprehenderit dolore aperiam, nihil quasi eos! Obcaecati, ut. A aperiam laudantium, ratione debitis voluptas nostrum molestiae consequuntur eaque harum pariatur. </p>
                            </div>
                            <div>
                                <h6>Document Requirement :</h6>
                                <p>Student Graduate, Diploma and ID's </p>
                            </div>
                        </div>
                        <div id='SidePanel__Buttons'>
                            <Button variant='outlined'>Decline</Button>
                            <Button variant='contained'>Process</Button>
                        </div>
                    </>:<>
                        <div id='SidePanel__SearchMember'>
                            <h6>Select Member</h6>
                            <SearchInput />
                        </div>
                        <div id='SidePanel__SelectDocument'>
                            <FormControl fullWidth variant='standard'>
                                <InputLabel id="demo-simple-select-label">Select Document</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectDocument}
                                label="Age"
                                onChange={handleChangeSelectDocument}
                                >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div id='SidePanel__Buttons'>
                            <Button variant='outlined'>Back</Button>
                            <Button variant='contained'>Submit</Button>
                        </div>
                    </>}
                    
                    
                </div>
            </div>
        </form>
    </>
}

export default CreateDocument