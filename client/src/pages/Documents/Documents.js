import React,{useEffect,useState} from 'react';
import './Documents.scss'
import {ethers} from 'ethers';

import Empty from '../../images/icons/empty-folder.png'
import Card from '../../components/Card/Card.js';
import DocumentCard from '../../components/Card/DocumentCard';
import axios from '../../config/axios';


function Documents() {
    const [address, setAddress] = useState("");
    const [ownedCertificates, setOwnedCertificates] = useState(null);

    useEffect(() => {
        const checkWallet = async () => {
            try{
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                setAddress(await signer.getAddress());
            }
            catch(err){
                console.error(err.message);
            }
        }
        const fetchOwnedCertificates = async () => {
            const response = await axios
                .get(`members/${address}/certificates`)
                .then((response) => {
                    setOwnedCertificates(response.data);
                });
        };
        checkWallet();
        fetchOwnedCertificates();
        
    })

    if (!ownedCertificates)
		return <div>loading... No OwnedCertificates Found</div>;

    return (
        <div id='Documents'>
        <section>
            <div className='Title__Div'>
                <h2 className='SectionTitle'>Documents</h2>
                <h5 className='SectionSubTitle'>My Collections of Documents</h5>
            </div>

            <div className='Wrapper__Card'>
            {(ownedCertificates.length === 0 )?
                <>
                    <div className='EmtpyCard'>
                        <div>
                            <img src={Empty} alt="" />
                            <p>No certificates available!</p>
                        </div>
                    </div>
                </>
                :
                <>
                    {ownedCertificates.length > 0 &&
                        ownedCertificates.map((ownedCertificate) => {
                            return (
                                <Card
                                    key={ownedCertificate.certificateId}
                                    id={ownedCertificate.certificateId}
                                    title={ownedCertificate.title}
                                    type={'certificate'}
                                    image={`https://icertify.infura-ipfs.io/ipfs/${ownedCertificate.ipfsCID}`}
                                />
                                // <Card
                                //     key={ownedCertificate.certificateId}
                                //     id={ownedCertificate.certificateId}
                                //     type={'certificate'}
                                //     image={`https://icertify.infura-ipfs.io/ipfs/${ownedCertificate.ipfsCID}`}
                                // />
                            );
                    })}
                </>
            }
            </div>
        </section>
        </div>
    )
}

export default Documents


