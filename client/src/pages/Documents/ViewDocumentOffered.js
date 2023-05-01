import React,{useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";

import './ViewDocumentOffered.scss';

import DocumentIcon from '../../images/icons/DocumentIcon.png';
import Button from '@mui/material/Button';
import ThankyouImage from '../../images/Resources/Design/Thankyou.png'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { TextField } from '@mui/material';
import Loading from '../../components/Loading/Loading';
// Import Utilities
import axiosInstance from '../../utils/axios';
import { useAuth } from "../../utils/AuthContext";

function DocumentRequestForm() {

    const { user, isAuth, isJoined } = useAuth();
    const { id, docId } = useParams();
    const navigate = useNavigate();

    // Constants Declarations
    const [institution, setInstitution] = useState();
    const [document, setDocument] = useState();

    // Excecutes on page load
    useEffect(() => {
      // Retrieves Institution Data
      const fetchInstitution = async () => {
        await axiosInstance
          .get(`institutions`,{
                      params: {
                          walletAddress: `${id}`
                      }
                  })
          .then((response) => {
            setInstitution(response.data)
                      function findValue(obj, val) {
                          for (let key in obj) {
                              if (typeof obj[key] === 'object') {
                                  const result = findValue(obj[key], val);
                                  if (result !== undefined) {
                                  return result;
                                  }
                              } else if (obj[key] === val) {
                                  return obj;
                              }
                          }
                          return undefined;
                      }
                      setDocument(findValue(response.data.docOffers, docId))
          });
      };
		fetchInstitution();
    }, [])


    // A function to request selected document
    const RequestDocument = async () => {
        try{
            await axiosInstance
                .post(`requests`, JSON.stringify({
                    type: 'document',
                    walletAddress: id,
                    docId: docId
                }))
                .then((response) => {
                    alert("Document Request Sent! Wait for the admin to approve your request")
                    navigate(`/institutions/${id}`)
                });
        } catch (err) {      
            console.error(err.message);
        }
    }

    if(!institution || !document) 
        return <Loading/>

    if(isJoined(id))
        navigate(`/unauthorized`)

    return (
        <div className="Container">
            <div className="Container__Content" id='DocumentInformation'>
                <div id='DocumentInformation'>
                    <div id='DocumentInformation__Header'>
                        <div id='DocumentInformation__Header__Triangle'></div>
                        <img src={DocumentIcon} alt="" />
                    </div>
                    <div id='DocumentInformation__Body'>
                        <h3 id='DocumentInformation__Title'>{document.title}</h3>
                        <div id='DocumentInformation__Details'>
                        <ul>
                            <li>
                            <h6 className='DocumentInformation__Details__Title'>Description</h6>
                            <p className='DocumentInformation__Details__Value'>{document.description}</p>
                            </li>
                            <li>
                            <h6 className='DocumentInformation__Details__Title'>Requirements</h6>
                            <p  className='DocumentInformation__Details__Value'>{document.requirements}</p>
                            </li>
                        </ul>
                        <ul>
                            <li>
                            <h6 className='DocumentInformation__Details__Title'>Price</h6>
                            <h5 className='DocumentInformation__Details__Value__Price'>{document.price}</h5>
                            </li>
                        </ul>
                        </div> 
                        <div id="Holder_Button">
                        <Button variant="contained" onClick={()=>RequestDocument()}>Request Document</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DocumentRequestForm