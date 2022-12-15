import React from 'react';


// User
import Home from './Pages/Home';

import Login from './Components/Login/Login';
import Signup from './Pages/Login & Signup/Signup.js'

import Dashboard from './Pages/Dashboard/Dashboard(User)';

import Credential from './Pages/Credential/Credential.js';
import CredentialView from './Pages/Credential/CredentialView.js';

import Event from './Pages/Event/Event';
import EventCreate from './Pages/Event/EventCreate.js';
import EventList from './Pages/Event/EventList.js';
import EventView from './Pages/Event/EventView.js';
import MemberView from './Pages/Member/MemberView.js';


// Admin

import DashboardAdmin from './Pages/Dashboard/Dashboard(Admin)';
import EventAdmin from './Pages/Event/EventAdmin'



import Error404 from './Pages/Error404';


import {Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoutes from './Routes/ProtectedRoutes';

function App() {

  return <Routes>    
    <Route path="/" element={<Home/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/dashboard/Signup" element={<Signup/>}/>
    <Route path="/events" element={<Event/>}/>
    <Route path="/events/:id" element={<EventView/>}/>
    <Route path="/members/:id" element={<MemberView/>}/>
    
    <Route path="*" element={<Error404/>}/>

    <Route path='/Credential/' element={<Credential/>}/>
    <Route path='/Credential/View' element={<CredentialView/>}/>

    <Route path="/Admin" element={<DashboardAdmin/>}/>
    <Route path="/Admin/Event" element={<EventAdmin/>}/>
    <Route path="/Admin/Event/Create" element={<EventCreate/>}/>

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
