
import React from 'react';

import Navigation from './../../Components/DashboardUserNavigation/DashboardNavigation';
import HeaderNavigation from './../../Components/DashboardUserNavigation/HeaderNavigation';

import CredentialTab from '../../Components/Credential/CredentialTab.js';
import Table from '../../Components/Credential/Table.js';

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


