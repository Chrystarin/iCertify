import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Utils
import ProtectedRoute from './utils/ProtectedRoute.js';
import Panel from './layouts/Panel/Panel.js';

// Public
import Error from './pages/Error/Error.js';
import LandingPage from './pages/LandingPage/LandingPage';
import Register from './pages/Register/Register.js';

// Member
import Dashboard from './pages/Dashboard/Dashboard';
import Document from './pages/Documents/Documents';
import DocumentPage from './pages/Documents/DocumentView.js';
import Institutions from './pages/Institution/Institutions.js';
import InstitutionsView from './pages/Institution/InstitutionView.js';
import JoinInstution from './pages/Institution/InstitutionJoin.js';
import Profile from './pages/Profile/Profile.js';
import ProfileUpdate from './pages/Profile/ProfileUpdate';
import RequestDocumentForm from './pages/Documents/DocumentRequestForm'

// Institution
import MintTransfer from './pages/MintTransfer/MintTransfer.js';
import DashboardAdmin from './pages/Analytics/Analytics';
import MemberList from './pages/Member/MemberList.js';
import AddDocumentOffered from './pages/Documents/AddDocumentOffered'
import InstitutionsUpdate from './pages/Institution/InstitutionUpdate.js';
import CreateDocument from './pages/Documents/CreateDocument';

function App() {
	return (
		<Routes>

            {/* Error Routes */}
            <Route path='*' element={<Error />}/>

			{/* Public Routes */}
            <Route path='/' element={<Panel/>}>
                    <Route path='' element={<LandingPage/>}/>
                    <Route path='register' element={<Register/>}/>
                    <Route path='users' element={<Institutions/>}/>
                    <Route path='users/:id' element={<Profile />} />
                    <Route path='institutions' element={<Institutions />}/>
                    <Route path='institutions/:id' element={<InstitutionsView owner={false}/>}/>
                    <Route path='documents/:id' element={<DocumentPage/>}/>
            </Route>

            {/* Member Routes */}
            <Route element={<ProtectedRoute/>} >
                <Route element={<Panel/>}>
                    <Route path='users/:id/edit' element={<ProfileUpdate />}/>
                    <Route path='dashboard' element={<Dashboard />}/>
                    <Route path='documents' element={<Document />} />
                    <Route path='institutions/:id/document' element={<RequestDocumentForm />}/>
                    <Route path='institutions/:id/join' element={<JoinInstution/>} />
                </Route>
            </Route>

            {/* Institution Routes */}
            <Route element={<ProtectedRoute/>} >
                <Route element={<Panel />} >
                    <Route path='institution/view' element={<InstitutionsView owner={true}/>} />
                    <Route path='institution/edit' element={<InstitutionsUpdate/>}/>
                    <Route path='analytics' element={<DashboardAdmin />}/>
                    <Route path='members' element={<MemberList />} />
                    <Route path='documents' element={<MintTransfer />} />
                    <Route path='document/create' element={<CreateDocument />} />
                    <Route path='document/add' element={<AddDocumentOffered />} />
                </Route>
            </Route>

		</Routes>
	);
}

export default App;