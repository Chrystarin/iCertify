import React from 'react';

import {Route, Routes } from 'react-router-dom';

import ProtectedRoutes from './routes/ProtectedRoutes.js';

// Public
import Error404 from './pages//Errors/Error404.js';
import Home from './pages/Home';
import Signup from './pages/Signup/Signup.js'

// Member
import MemberPanel from './routes/Member.js';
import MemberView from './pages/Member/MemberView.js';
import MemberEdit from './pages/Member/MemberEdit.js'
import Dashboard from './Layouts/Dashboard/Dashboard';
import Credential from './Layouts/Credential/Credential';
import Credential_View from './Layouts/Credential/CredentialView.js';
import Event from './Layouts/Event/Event';
import Event_View from './Layouts/Event/EventView';
import JoinEvent from './Layouts/Event/JoinEvent';
import Profile from './Layouts/Profile/profile'

// Admin
import AdminPanel from './routes/Admin.js';
import A_Event from './Layouts/Event/Admin/Event';
import A_EventCreate from './Layouts/Event/Admin/EventCreate.js'
import CertificateGenerator from './pages/CertificateGenerator/CertificateGenerator.js'

// const ROLES = {
//   member: '46936',
//   admin: '28537',
//   accountant: '04279'
// }

function App() {
  return (
    <Routes>  

      {/* Public Routes */}
      <Route path="*" element={<Error404/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>

      <Route path='/member' element={<MemberPanel/>}>
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="credential" element={<Credential/>}/>
        <Route path="credential/view" element={<Credential_View/>}/>
        <Route path="event" element={<Event/>}/>
        <Route path="event/view/:id" element={<Event_View/>}/>
        <Route path='event/view/join' element={<JoinEvent/>}/>
        <Route path=":id" element={<MemberView/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path=":id/edit" element={<MemberEdit/>}/>
      </Route>

      <Route path='/admin' element={<AdminPanel/>}>
        <Route path="event" element={<A_Event/>}/>
        <Route path="event/create" element={<A_EventCreate/>}/>
        <Route path="certificate/generate" element ={<CertificateGenerator/>}/>
      </Route>

     
  </Routes>
)}

export default App;


 {/* Routes for members */}
      {/* <Route element={<ProtectedRoutes allowedRoles={'members'}/>}>
        <Route path='/member' element={<MemberPanel/>}>
          <Route path="dashboard" element={<Dashboard/>}/>

          <Route path="credential" element={<Credential/>}/>
          <Route path="credential/view" element={<Credential_View/>}/>

          <Route path="event" element={<Event/>}/>
          <Route path="event/view/:id" element={<Event_View/>}/>

          <Route path=":id" element={<MemberView/>}/>
        </Route>
      </Route> */}

      {/* Routes for Admin */}
      {/* <Route element={<ProtectedRoutes allowedRoles={[ROLES.admin]}/>}>
        <Route path='/admin' element={<AdminPanel/>}>
          <Route path="accountants" element={<Error404/>}/>
          <Route path="analytics" element={<Error404/>}/>
          <Route path="accountants" element={<Error404/>}/>
        </Route>

        <Route path='/event' element={<A_Event/>}>
          <Route path=":id" element={<A_EventCreate/>}/>
          <Route path=":id/edit" element={<A_EventCreate/>}/>
          <Route path="create" element={<A_EventCreate/>}/>
        </Route>

      </Route> */}

      {/* Routes for Accountant */}
      {/* <Route element={<ProtectedRoutes allowedRoles={[ROLES.accountant]}/>}> */}
        {/* Insert routes here */}
      {/* </Route> */}

      {/* Routes for Organizer  */}
      {/* <Route element={<ProtectedRoutes allowedRoles={[ROLES.organizer]}/>}> */}
        {/* Insert routes here */}
      {/* </Route> */}


      {/* Routes for Admin & Member*/}
      {/* <Route element={<ProtectedRoutes allowedRoles={[ROLES.admin, ROLES.member]}/>}> */}
        {/* Insert routes here */}
      {/* </Route> */}

      {/* Routes for Admin & Accountant*/}
      {/* <Route element={<ProtectedRoutes allowedRoles={[ROLES.admin, ROLES.accountant]}/>}> */}
        {/* Insert routes here */}
      {/* </Route> */}

      {/* Routes for Admin & Organizer*/}
      {/* <Route element={<ProtectedRoutes allowedRoles={[ROLES.admin, ROLES.organizer]}/>}> */}
        {/* Insert routes here */}
      {/* </Route> */}

      

    

    {/* --------------------TEST---------------------- */}


    {/* <Route path='/Credential/' element={<Credential/>}/>
    <Route path='/Credential/View' element={<CredentialView/>}/> */}

    {/* <Route path="/Admin" element={<DashboardAdmin/>}/>
    <Route path="/Admin/Event" element={<EventAdmin/>}/>
    <Route path="/Admin/Event/Create" element={<EventCreate/>}/> */}

    {/* <Route element={<ProtectedRoutes/>}>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Route> */}


// Public Routes
// /
// /getstarted
// /about
// /dashboard
// /event
// /event/create
// /event/:id
// /member/:id
// /credential
// /credential/:id

// Protected Routes Accountant
// /dashboard
// /request
// /request/:id

// Protected Routes Admin
// /dashboard
// /event/create
// /event/drafts
// /event/:id/edit
// /member
// /accountant
// /accountant/create
// /accountant/edit
// /accountant/:id