import React from 'react'

function mintTransfer() {

    const sendDocument = async (file) => {
        const formData = new FormData();
        formData.append('certificate', file);

        try {
            // Try to upload the file to ipfs
            const uploadData = await fetch('http://localhost:6787/certificates/ipfs', {
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
            }).then(res => res.json());

            console.log(uploadData);
            // Ethers
        } catch ({ name, message }) {
            console.log(name, message);
        }
    }

    return (
        <div>
            <input type='file' onChange={(e) => sendDocument(e.target.files[0]) }></input>
        </div>
    )
}

export default mintTransfer