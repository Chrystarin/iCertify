import React,{useState} from 'react';
import './Credential.scss'

import CredentialTab from '../../components/CredentialTab/CredentialTab.js';
import Table from '../../components/Table/Table.js';


function Credential() {
  const [TabActive, setTabActive] = useState("Documents");
  return (
    <div id='Credential'>
      <section>
        <div className='Title__Div'>
          <h2 className='SectionTitle'>Credential</h2>
          <h5 className='SectionSubTitle'>Collection of your Certificates</h5>
        </div>
        <CredentialTab Active={TabActive} Setter={setTabActive}/>
        <div id='CredentialVIewPanel'>
          {(TabActive === "Documents")?<>
            Documents
            <Table />
          </>
          :
          <>
            Requests
            <Table />
          </>
          }
        </div>
      </section>
    </div>
  )
}

export default Credential


