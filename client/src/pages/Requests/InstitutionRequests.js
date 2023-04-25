import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import axiosInstance from '../../utils/axios';

function InstitutionRequests() {

	const [requests, setRequests] = useState();

	// Excecutes on page load
    useEffect(() => {
        fetchDocumentRequests();
    }, [])
    
    // Retrieves Document Requests
    const fetchDocumentRequests = async () => {
        await axiosInstance
            .get(`requests`,{
                params: {
                    type: 'document'
                }
            })
            .then((response) => { 
                setRequests(response.data)
                console.log(response.data)
            });
    };

    const ProcessRequest = async (request, action) => {
        console.log(request)
        console.log(action)
        // try {
        //     await axiosInstance.patch(
        //         `requests`,
        //         JSON.stringify({ 
        //             requestId: request.requestId,
        //             status: action
        //         })
        //     )
        //     .then((res)=>{
        //         alert("Document Added!")
        //         console.log(res.data)
        //     })
        // } catch (err) {      
        //     console.error(err.message);
        // }
    }

	if (!requests) return <div>loading...</div>;

	return (
		<>
            <h1>Pending Requests</h1>
			{requests.length > 0 && requests.map((request) => {
                if (request.status=='pending') {
                    return (
                        <div key={request.requestId}>
                            <h3>{request.requestor.name.firstName + ' ' + request.requestor.name.lastName}</h3>
                            <h5>{request.requestor.walletAddress}</h5>
                            <h5>{request.details.docId}</h5>
                            <button onClick={()=>ProcessRequest(request, 'approved')}>Approve</button>
                            <button onClick={()=>ProcessRequest(request, 'declined')}>Decline</button>
                        </div>
                    );
                }
            })}

            <h1>Paid Requests</h1>
			{requests.length > 0 && requests.map((request) => {
                if (request.status=='paid') {
                    return (
                        <div key={request.requestId}>
                            <h3>{request.requestor.name.firstName + ' ' + request.requestor.name.lastName}</h3>
                            <h5>{request.requestor.walletAddress}</h5>
                            <h5>{request.details.docId}</h5>
                            <button onClick={console.log("Verify: " + request.requestId)}>Verify</button>
                            <button onClick={console.log("Decline: " + request.requestId)}>Decline</button>
                        </div>
                    );
                }
            })}

            <h1>Verified Requests</h1>
			{requests.length > 0 && requests.map((request) => {
                if (request.status=='verified') {
                    return (
                        <div key={request.requestId}>
                            <h3>{request.requestor.name.firstName + ' ' + request.requestor.name.lastName}</h3>
                            <h5>{request.requestor.walletAddress}</h5>
                            <h5>{request.details.docId}</h5>
                            <button onClick={console.log("Process: " + request.requestId)}>Process</button>
                            
                        </div>
                    );
                }
            })}
		</>	
	);
}

export default InstitutionRequests;
