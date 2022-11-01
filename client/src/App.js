
import React from 'react';

import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Event from './Pages/Event';
import EventList from './Pages/EventList';
import Error404 from './Pages/Error404';

import {Route, Routes} from 'react-router-dom';

function App() {
  return <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/events" element={<EventList/>}/>
    <Route path="/events/:id" element={<Event/>}/>
    <Route path="*" element={<Error404/>}/>
  </Routes>
}

export default App;
