import React,{useEffect,useState} from 'react';
import './Credential.scss'

import { useParams } from 'react-router-dom';

import Empty from '../../images/icons/empty-folder.png'
import Card from '../../components/Card/Card.js';

import axios from '../../config/axios';


function Credential() {
 
  return (
    <div id='Credential'>
      <section>
        <div className='Title__Div'>
          <h2 className='SectionTitle'>Credential</h2>
          <h5 className='SectionSubTitle'>Collection of your Certificates</h5>
        </div>
        
        <div className='Wrapper__Card'>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
      </section>
    </div>
  )
}

export default Credential


