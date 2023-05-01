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
import ViewDocumentOffered from './pages/Documents/ViewDocumentOffered.js'
import DocumentRequestPayment from './pages/Documents/DocumentRequestPayment.js'

// Institution
import CreateDocuments from './pages/GenerateDocuments/GenerateDocuments.js';
import DashboardAdmin from './pages/Analytics/Analytics';
import MemberList from './pages/Member/MemberList.js';
import AddDocumentOffered from './pages/Documents/AddDocumentOffered'
import InstitutionsUpdate from './pages/Institution/InstitutionUpdate.js';
import CreateDocument from './pages/Documents/CreateDocument';
import UpdatePaymentMethod from './pages/GenerateDocuments/UpdatePaymentMethod.js'

import InstitutionPaymentEdit from './pages/Institution/InstitutionPaymentEdit.js';
import MemberRequests from './pages/Requests/MemberRequests.js';
import Test from './pages/Test.js'

function App() {
	return (
		<Routes>
            {/* Error Routes */}
            <Route path='*' element={<Error />}/>
            {/* For Unautherize  */}
            {/* <Route path='*' element={<Error unautherize="true"/>}/> */}
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
                    <Route path='requests' element={<Document />} />
                    <Route path='requests/:tab' element={<Document />} />
                    <Route path='requests/pay/:reqId' element={<DocumentRequestPayment />}/>
                    {/* Edited */}
                    <Route path='institutions/:id/:docId' element={<ViewDocumentOffered />}/>
                    {/* new */}
                    <Route path='institutions/payment/:id/:docId' element={<DocumentRequestPayment />}/>
                    <Route path='institutions/:id/join' element={<JoinInstution/>} />
                    
                </Route>
            </Route>

            {/* Institution Routes */}
            <Route element={<ProtectedRoute/>} >
                <Route element={<Panel />} >
                    <Route path='institutions/:id/edit' element={<InstitutionsUpdate/>}/>
                    <Route path='institutions/:id/edit/payment' element={<InstitutionPaymentEdit/>}/>
                    <Route path='analytics' element={<DashboardAdmin />}/>
                    <Route path='members' element={<MemberList />} />
                    <Route path='documents/requests/:tab' element={<CreateDocuments/>} />
                    <Route path='documents/request/:id' element={<CreateDocument manual={false}/>} />
                    <Route path='documents/requests/manual' element={<CreateDocument manual={true}/>} />
                    <Route path='documents/add' element={<AddDocumentOffered />} />
                    <Route path='documents/update/payment' element={<UpdatePaymentMethod />} />
                </Route>
            </Route>

		</Routes>
	);
}

export default App;