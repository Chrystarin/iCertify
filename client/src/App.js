import React from 'react';
import RequireAuth from './Authentication/RequireAuth';
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

// Admin

import AdminPanel from './Pages/Admin';

import A_Event from './Layouts/Admin/Event/Event.js';
import A_EventCreate from './Layouts/Admin/Event/EventCreate.js'

import MemberView from './Pages/Member/MemberView.js';

const ROLES = {

}

function App() {
  return <Routes>  

    {/* Public Routes */}
    <Route path="*" element={<Error404/>}/>
    <Route path="/" element={<Home/>}/>
    <Route path="/signup" element={<Signup/>}/>

    {/* Routes for members */}
    <Route element={<RequireAuth allowedRoles={['member']}/>}>
      <Route path='/member' element={<MemberPanel/>}>
        <Route path="dashboard" element={<Dashboard/>}/>

        <Route path="credential" element={<Credential/>}/>
        <Route path="credential/view" element={<Credential_View/>}/>

        <Route path="event" element={<Event/>}/>
        <Route path="event/view/:id" element={<Event_View/>}/>

        <Route path=":id" element={<MemberView/>}/>
      </Route>
    </Route>

    {/* Routes for admin */}
    <Route element={<RequireAuth allowedRoles={['admin']}/>}>
      <Route path='/admin' element={<AdminPanel/>}>
        <Route path="event" element={<A_Event/>}/>
        <Route path="event/create" element={<A_EventCreate/>}/>
      </Route>
    </Route>

    <Route element={<RequireAuth allowedRoles={['admin', 'accountant']}/>}>
      {/* Insert routes here */}
    </Route>
    
  </Routes>
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