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
import MemberDocRequests from './pages/Requests/MemberDocRequests.js';
import DocumentView from './pages/Documents/DocumentView.js';
import Institutions from './pages/Institution/Institutions.js';
import InstitutionsView from './pages/Institution/InstitutionView.js';
import JoinInstution from './pages/Institution/InstitutionJoin.js';
import Profile from './pages/Profile/Profile.js';
import ProfileUpdate from './pages/Profile/ProfileUpdate';
import ViewDocumentOffered from './pages/Documents/ViewDocumentOffered.js'
import DocumentRequestPayment from './pages/Documents/DocumentRequestPayment.js'

// Institution
import InstitutionDocRequests from './pages/Requests/InstitutionDocRequests.js';
import MemberList from './pages/Member/MemberList.js';
import AddDocumentOffered from './pages/Documents/AddDocumentOffered'
import InstitutionUpdateProfile from './pages/Institution/InstitutionUpdateProfile.js';
import CreateDocument from './pages/Documents/CreateDocument';
import InstitutionUpdatePayment from './pages/Institution/InstitutionUpdatePayment.js'

function App() {
	return <>
        <Routes>
            <Route element={<Panel />} >
			
                {/* Error Routes */}
                <Route path='*' element={<Error />}/>
                {/* For Unauthorized  */}
                <Route path='/unauthorized' element={<Error unauthorized="true"/>}/>

                <Route path='' element={<LandingPage/>}/>
                <Route path='register' element={<Register/>}/>
                <Route path='users' element={<Institutions/>}/>
                <Route path='users/:id' element={<Profile />} />
                <Route path='institutions' element={<Institutions />}/>
                <Route path='institutions/:id' element={<InstitutionsView owner={false}/>}/>
                <Route path='documents/:id' element={<DocumentView/>}/>
            

            {/* Member Routes */}
                <Route element={<ProtectedRoute allowedRole={'user'}/>} >
                    <Route path='users/:id/edit' element={<ProfileUpdate />}/>
                    <Route path='requests' element={<MemberDocRequests />} />
                    <Route path='requests/:tab' element={<MemberDocRequests />} />
                    <Route path='requests/pay/:reqId' element={<DocumentRequestPayment />}/>
                    <Route path='institutions/:id/:docId' element={<ViewDocumentOffered />}/>
                    <Route path='institutions/:id/join' element={<JoinInstution/>} />
                </Route>

            {/* Institution Routes */}
                <Route element={<ProtectedRoute allowedRole={'institution'}/>} >
                    <Route path='institutions/:id/edit' element={<InstitutionUpdateProfile/>}/>
                    <Route path='institutions/edit/payment' element={<InstitutionUpdatePayment/>}/>
                    <Route path='members' element={<MemberList />} />
                    <Route path='documents/add' element={<AddDocumentOffered />} />
                    <Route path='documents/:id/edit' element={<AddDocumentOffered />} />
                    <Route path='documents/requests/:tab' element={<InstitutionDocRequests/>} />
                    <Route path='documents/request/:id' element={<CreateDocument manual={false}/>} />
                    <Route path='documents/requests/manual' element={<CreateDocument manual={true}/>} />
                </Route>
            </Route>
		</Routes>
    </>;
}

export default App;