import React from 'react';
import {Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './Routes/ProtectedRoutes';

import Error404 from './Pages/Error404';

import Home from './Pages/Home';
import Signup from './Pages/Signup/Signup.js'


// Member Components
import MemberPanel from './Pages/Member';

import Dashboard from './Layouts/Dashboard/Dashboard';

import Credential from './Layouts/Credential/Credential';
import Credential_View from './Layouts/Credential/CredentialView.js';

import Event from './Layouts/Event/Event';
import Event_View from './Layouts/Event/EventView';
import JoinEvent from './Layouts/Event/JoinEvent';


import Profile from './Layouts/Profile/profile'
// Admin

import AdminPanel from './Pages/Admin';

import A_Event from './Layouts/Event/Admin/Event';
import A_EventCreate from './Layouts/Event/Admin/EventCreate.js'

import MemberView from './Pages/Member/MemberView.js';

function App() {
  return <Routes>  

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



    </Route>

    <Route path='/admin' element={<AdminPanel/>}>
      <Route path="event" element={<A_Event/>}/>
      <Route path="event/create" element={<A_EventCreate/>}/>
    </Route>

    {/* --------------------TEST---------------------- */}


    {/* <Route path='/Credential/' element={<Credential/>}/>
    <Route path='/Credential/View' element={<CredentialView/>}/> */}

    {/* <Route path="/Admin" element={<DashboardAdmin/>}/>
    <Route path="/Admin/Event" element={<EventAdmin/>}/>
    <Route path="/Admin/Event/Create" element={<EventCreate/>}/> */}

    {/* <Route element={<ProtectedRoutes/>}>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Route> */}
  </Routes>


{/* <Routes>

    // Public Routes
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<Home/>}/>
    <Route path="/about/icertify" element={<Home/>}/>
    <Route path="/about/" element={<Home/>}/>

    // Protected Routes User
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/events" element={<EventList/>}/>
    <Route path="/events/:id" element={<Event/>}/>

    // Protected Routes Admin
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/events/create" element={<EventList/>}/>
    <Route path="/events/edit" element={<EventList/>}/>
    <Route path="/accountants" element={<EventList/>}/>
    <Route path="/accountants/create" element={<EventList/>}/>

    // Catch All
    <Route path="*" element={<Error404/>}/>
  </Routes> */}
}

export default App;

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