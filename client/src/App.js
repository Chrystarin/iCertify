import React from 'react';

import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard/Dashboard(User)';
import Event from './Pages/Event/Event';
import EventList from './Pages/Event/EventList.js';
import Error404 from './Pages/Error404';
import Login from './Components/Login/Login';

import {Route, Routes, Navigate } from 'react-router-dom';

function App() {

  return <Routes>    
    <Route path="/" element={<Home/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/events" element={<Event/>}/>
    <Route path="/events/:id" element={<Event/>}/>
    <Route path="*" element={<Error404/>}/>
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
