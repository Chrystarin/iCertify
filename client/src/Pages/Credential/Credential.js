
import React from 'react';

import Navigation from './../../Layouts/Dashboard/DashboardNavigation';
import HeaderNavigation from './../../Layouts/Dashboard/HeaderNavigation';

import CredentialTab from '../../Layouts/Credential/CredentialTab.js';
import Table from '../../Layouts/Table.js';

function Credential() {
  return (
    <div id='DashboardHolder'>
      <div id="Navigation">
        <Navigation />
      </div>
      <div id="Holder_Content">
        <HeaderNavigation/>
        <div id="Content">
          <section>
            <h4 className='SectionTitle'>Credential</h4>
            <CredentialTab Active="Documents"/>
          </section>
          <section>
            <Table/>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Credential


