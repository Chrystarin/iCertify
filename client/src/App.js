import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";

import CertificateGenerator from './Pages/CertificateGenerator'
import Error404 from './Pages/Error404'

const App = () => (
//   <BrowserRouter>
//     <Switch>
//       <Redirect exact from="/" to="/Certificate/Create" />
//       <Route path="/Certificate/Create" element={CertificateGenerator} />
//       <Route path="*" element={Error404} />
//     </Switch>
//   </BrowserRouter>

    // <Router>
    //     <Routes>
    //         <Route path="/certificate/create" element={<CertificateGenerator />} />
    //         <Route path="/" element={<Navigate replace to="/certificate/create" />} />
    //         <Route path="*" element={<Error404/>} />
    //     </Routes>
    // </Router>
)

export default App