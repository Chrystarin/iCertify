import React, { useState, useEffect } from 'react';

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
                    requestType: 'document'
                }
            })
            .then((response) => { 
                setRequests(response.data)
                console.log(response.data)
            });
    };

    const ProcessRequest = async (request, action) => {
        try {
            const formData = new FormData();
            formData.append('body', JSON.stringify({
                requestId: request.requestId,
                status: action,
            }))

            await axiosInstance.patch(
                `requests`,
                formData
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
            <hr/><h3>Pending Requests [To Approve]</h3><hr/>
			{requests.length > 0 && requests.map((request) => {
                if (request.status=='pending') {
                    return (
                        <div key={request.requestId}>
                            <h3>{request.requestor.name.firstName + ' ' + request.requestor.name.lastName}</h3>
                            <p>{request.requestor.walletAddress}</p>
                            <h5>{request.details.offeredDoc.title}</h5>
                            <p>Price: {request.details.offeredDoc.price}</p>
                            <p>Requested On: {request.createdAt}</p>
                            <button onClick={()=>ProcessRequest(request, 'approved')}>Approve</button>
                            <button onClick={()=>ProcessRequest(request, 'declined')}>Decline</button><hr/>
                        </div>
                    );
                }
            })}

            <hr/><h1>Approved Requests [For Payment]</h1><hr/>
			{requests.length > 0 && requests.map((request) => {
                if (request.status=='approved') {
                    return (
                        <div key={request.requestId}>
                            <h3>{request.requestor.name.firstName + ' ' + request.requestor.name.lastName}</h3>
                            <p>{request.requestor.walletAddress}</p>
                            <h5>{request.details.offeredDoc.title}</h5>
                            <p>Price: {request.details.offeredDoc.price}</p>
                            <p>Approved On: {request.details.statusTimestamps.approved}</p>
                            <hr/>
                        </div>
                    );
                }
            })}

            <hr/><h3>Paid Requests [To Verify]</h3><hr/>
			{requests.length > 0 && requests.map((request) => {
                if (request.status=='paid') {
                    return (
                        <div key={request.requestId}>
                            <h3>{request.requestor.name.firstName + ' ' + request.requestor.name.lastName}</h3>
                            <h5>{request.requestor.walletAddress}</h5>
                            <h5>{request.details.offeredDoc.title}</h5>
                            <p>Price: {request.details.offeredDoc.price}</p>
                            <p>Paid On: {request.details.statusTimestamps.paid}</p>
                            <button><a href={request.details.proof} target="_blank">View Proof of Payment</a></button><br/>
                            <button onClick={()=>ProcessRequest(request, 'verified')}>Verify</button>
                            <button onClick={()=>ProcessRequest(request, 'declined')}>Decline</button><hr/>
                        </div>
                    );
                }
            })}

            <hr/><h3>Verified Requests [To Process]</h3><hr/>
			{requests.length > 0 && requests.map((request) => {
                if (request.status=='verified') {
                    return (
                        <div key={request.requestId}>
                            <h3>{request.requestor.name.firstName + ' ' + request.requestor.name.lastName}</h3>
                            <p>{request.requestor.walletAddress}</p>
                            <h5>{request.details.offeredDoc.title}</h5>
                            <p>Price: {request.details.offeredDoc.price}</p>
                            <p>Verified On: {request.details.statusTimestamps.verified  }</p>
                            <button onClick={console.log("Process: " + request.requestId)}>Process</button><hr/>
                        </div>
                    );
                }
            })}

            <hr/><h3>Declined and Cancelled Requests [Unsuccessful Requests]</h3><hr/>
			{requests.length > 0 && requests.map((request) => {
                if (request.status=='declined' || request.status=='cancelled') {
                    return (
                        <div key={request.requestId}>
                            <h3>{request.requestor.name.firstName + ' ' + request.requestor.name.lastName}</h3>
                            <h5>{request.requestor.walletAddress}</h5>
                            <h5>{request.details.offeredDoc.title}</h5>
                            <p>Price: {request.details.offeredDoc.price}</p>
                            <p>Timestamp: {request.details.statusTimestamps.declined ?? request.details.statusTimestamps.cancelled}</p>
                        </div>
                    );
                }
            })}

            <hr/><h3>Completed Requests [Successful Requests]</h3><hr/>
			{requests.length > 0 && requests.map((request) => {
                if (request.status=='completed') {
                    return (
                        <div key={request.requestId}>
                            <h3>{request.requestor.name.firstName + ' ' + request.requestor.name.lastName}</h3>
                            <h5>{request.requestor.walletAddress}</h5>
                            <h5>{request.details.docId}</h5>
                        </div>
                    );
                }
            })}
		</>	
	);
}

export default InstitutionRequests;
