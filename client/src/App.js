
import React from 'react';

import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard/Dashboard(User)';
import Event from './Pages/Event/Event';
import EventList from './Pages/Event/EventList.js';
import Error404 from './Pages/Error404';

import {Route, Routes} from 'react-router-dom';

function App() {
  return <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/events" element={<Event/>}/>
    <Route path="/events/:id" element={<Event/>}/>
    <Route path="*" element={<Error404/>}/>
  </Routes>
}

export default App;
