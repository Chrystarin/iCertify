import React, { useState } from 'react';
import axiosInstance from './../utils/axios';

function Test() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axiosInstance.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response)=>{
        console.log(response)
        console.log(response.data.url)
        setUrl(response.data.url)
      })

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      <button onClick={handleFileUpload}>Upload</button>
      {url && <img src={url} alt="Uploaded file" />}
    </div>
  );
}

export default Test;