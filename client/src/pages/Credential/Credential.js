import React from 'react';
import CredentialTab from '../../components/CredentialTab/CredentialTab.js';
import Table from '../../components/Table/Table.js';

function Credential() {
  return (
    <div id='Credential'>
      <section>
        <div className='Title__Div'>
          <h2 className='SectionTitle'>Credential</h2>
          <h5 className='SectionSubTitle'>Collection of your Certificates</h5>
        </div>
        <CredentialTab Active="Documents"/>
      </section>
      <section>
        <Table/>
      </section>
    </div>
  )
}

export default Credential


