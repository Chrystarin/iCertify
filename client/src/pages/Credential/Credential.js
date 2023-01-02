import React from 'react';
import CredentialTab from '../../components/CredentialTab/CredentialTab.js';
import Table from '../../components/Table/Table.js';

function Credential() {
  return (
    <div id='Credential'>
      <section>
        <h4 className='SectionTitle'>Credential</h4>
        <CredentialTab Active="Documents"/>
      </section>
      <section>
        <Table/>
      </section>
    </div>
  )
}

export default Credential


