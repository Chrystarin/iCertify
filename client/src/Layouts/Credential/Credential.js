import React from 'react';

import Navigation from './../../Layouts/Dashboard/DashboardNavigation';
import HeaderNavigation from './../../Layouts/Dashboard/HeaderNavigation';

import CredentialTab from '../../Layouts/Credential/CredentialTab.js';
import Table from '../../Layouts/Credential/Table.js';

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


