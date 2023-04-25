import React, { useState, useEffect } from 'react';

import axiosInstance from '../../utils/axios';

function MemberRequests() {

	const [requests, setRequests] = useState();
    const [proofOfPayment, setProofOfPayment] = useState()

	// Excecutes on page load
    useEffect(() => {
        fetchDocumentRequests();
    }, [])
    
    // Retrieves Document Requests
    const fetchDocumentRequests = async () => {
        await axiosInstance
            .get(`requests`,{
                params: {
                    requestType: 'document'
                }
            })
            .then((response) => { 
                setRequests(response.data)
                console.log(response.data)
            });
    };

    const ProcessRequest = async (request, action, payment) => {
        try {
            const formData = new FormData();
            formData.append('body', JSON.stringify({
                requestId: request.requestId,
                status: action,
            }))

            if(payment){
                formData.append('proof', proofOfPayment);
            }

            await axiosInstance.patch(
                `requests`,
                formData,
                {headers: {
                      'Content-Type': 'multipart/form-data'
                }}
            )
            .then((response)=>{
                alert(`Document ${action}!`)
                console.log(response.data)
                fetchDocumentRequests();
            })
        } catch (err) {      
            console.error(err.message);
        }
    }

	if (!requests) return <div>loading...</div>;

	return (
		<>
            <hr/><h1>Pending Requests [For Approval]</h1><hr/>
                {requests.length > 0 && requests.map((request) => {
                    if (request.status=='pending') {
                        return (
                            <div key={request.requestId}>
                                <h3>{request.institution.name}</h3>
                                <p>{request.institution.walletAddress}</p>
                                <h5>{request.details.offeredDoc.title}</h5>
                                <p>Price: {request.details.offeredDoc.price}</p>
                                <p>Requested On: {request.createdAt}</p>
                                <button onClick={()=>ProcessRequest(request, 'paid', true)}>Pay</button>
                                <button onClick={()=>ProcessRequest(request, 'cancelled')}>Cancel</button>
                                <hr/>
                            </div>
                        );
                    }
                })}
                
            <hr/><h1>Approved Requests [To Pay]</h1><hr/>
			{requests.length > 0 && requests.map((request) => {
                if (request.status=='approved') {
                    return (
                        <div key={request.requestId}>
                            <h3>{request.institution.name}</h3>
                            <p>{request.institution.walletAddress}</p>
                            <h5>{request.details.offeredDoc.title}</h5>
                            <p>Price: {request.details.offeredDoc.price}</p>
                            <p>Approved On: {request.details.statusTimestamps.approved}</p>
                            Proof of Payment: <input type="file" onChange={(e)=>setProofOfPayment(e.target.files[0])}/><br/>
                            <button onClick={()=>ProcessRequest(request, 'paid', true)}>Pay</button>
                            <button onClick={()=>ProcessRequest(request, 'cancelled')}>Cancel</button>
                            <hr/>
                        </div>
                    );
                }
            })}

            <hr/><h1>Paid Requests [For Verification]</h1><hr/>
			{requests.length > 0 && requests.map((request) => {
                if (request.status=='paid') {
                    return (
                        <div key={request.requestId}>
                            <h3>{request.institution.name}</h3>
                            <p>{request.institution.walletAddress}</p>
                            <h5>{request.details.offeredDoc.title}</h5>
                            <p>Price: {request.details.offeredDoc.price}</p>
                            <p>Paid On: {request.details.statusTimestamps.paid}</p>
                            <button onClick={()=>ProcessRequest(request, 'paid', true)}>Pay</button>
                            <button onClick={()=>ProcessRequest(request, 'cancelled')}>Cancel</button>
                            <hr/>
                        </div>
                    );
                }
            })}

            <hr/><h1>Verified Requests [For Processing]</h1><hr/>
			{requests.length > 0 && requests.map((request) => {
                if (request.status=='verified') {
                    return (
                        <div key={request.requestId}>
                            <h3>{request.institution.name}</h3>
                            <p>{request.institution.walletAddress}</p>
                            <h5>{request.details.offeredDoc.title}</h5>
                            <p>Price: {request.details.offeredDoc.price}</p>
                            <p>Verified On: {request.details.statusTimestamps.verified  }</p>
                            <button onClick={()=>ProcessRequest(request, 'paid', true)}>Pay</button>
                            <button onClick={()=>ProcessRequest(request, 'cancelled')}>Cancel</button>
                            <hr/>
                        </div>
                    );
                }
            })}

        <hr/><h1>Cancelled and Declined Requests [Unsuccessful Requests]</h1><hr/>
			{requests.length > 0 && requests.map((request) => {
                if (request.status=='declined' || request.status=='cancelled') {
                    return (
                        <div key={request.requestId}>
                            <h3>{request.institution.name}</h3>
                            <p>{request.institution.walletAddress}</p>
                            <h5>{request.details.offeredDoc.title}</h5>
                            <p>Price: {request.details.offeredDoc.price}</p>
                            <p>Timestamp: {request.details.statusTimestamps.declined ?? request.details.statusTimestamps.cancelled}</p>
                            <button onClick={()=>ProcessRequest(request, 'paid', true)}>Pay</button>
                            <button onClick={()=>ProcessRequest(request, 'cancelled')}>Cancel</button>
                            <hr/>
                        </div>
                    );
                }
            })}

            {/* <h1>Paid Requests</h1>
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
            })} */}
		</>	
	);
}

export default MemberRequests;
