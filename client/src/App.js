import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Routes
import ProtectedRoutes from './routes/ProtectedRoutes.js';

// Public

import Error from './pages/Error/Error.js';
import LandingPage from './pages/LandingPage/LandingPage';
import GetStarted from './pages/GetStarted/GetStarted.js';

// Member
import MemberPanel from './routes/Member.js';
import MemberView from './pages/Member/MemberView.js';
import MemberEdit from './pages/Member/MemberEdit.js';
import Dashboard from './pages/Dashboard/Dashboard';
import Document from './pages/Documents/Documents';
import DocumentPage from './pages/Documents/DocumentView.js';
import Institutions from './pages/Institution/Institutions.js';
import Institution_View from './pages/Institution/InstitutionView.js';
import JoinInstution from './pages/Institution/InstitutionJoin.js';
import Profile from './pages/Profile/Profile.js';
import ProfileUpdate from './pages/Profile/ProfileUpdate';

// Admin
import AdminPanel from './routes/Admin.js';
import DocumentsOffered from './pages/Institution/Admin/DocumentsOffered.js';
import A_EventCreate from './pages/Institution/Admin/EventCreate.js';
import CertificateGenerator from './pages/CertificateGenerator/CertificateGenerator.js';
import MintTransfer from './pages/MintTransfer/MintTransfer.js';
import CertificateGenerateEventsList from './pages/CertificateGenerator/CertificateGenerateEventsList.js';
import DashboardAdmin from './pages/Dashboard/DashboardAdmin';
import CertificateComponent from './components/Certificate/Certificate.js';

import PublicPanel from './routes/Public.js';
// const ROLES = {
//   member: '46936',
//   admin: '28537',
//   accountant: '04279'
// }

function App() {
	return (
		<Routes>
			{/* Public Routes */}
            <Route path='/' element={<PublicPanel/>}>
                <Route path='*' element={<Error />}/>
                <Route path='home' element={<LandingPage/>}/>
                <Route path='getstarted' element={<GetStarted/>}/>
				<Route path='event/:id' element={<Institution_View />}/>
                <Route path='documents/:id' element={<DocumentPage/>}/>
                <Route path='user/:id' element={<Profile />}/>
			</Route>

            {/* Member Routes */}
			<Route path='/m' element={<MemberPanel />}>
                <Route path='*' element={<Error />}/>
				<Route path='dashboard' element={<Dashboard />}/>
                <Route path='documents' element={<Document />} />
				<Route path='document/:id' element={<DocumentPage />} />
				<Route path='institutions' element={<Institutions />}/>
				<Route path='institution/:id' element={<Institution_View />} />
				<Route path='institution/:id/join' element={<JoinInstution />} />
				<Route path=':id' element={<Profile />} />
				<Route path=':id/edit' element={<ProfileUpdate />}/>
			</Route>

            {/* Admin Routes */}
			<Route path='/a' element={<AdminPanel />} >
                <Route path='*' element={<Error />}/>
                <Route path='dashboard' element={<DashboardAdmin />}/>
                <Route path='member/:id' element={<Profile />} />
				<Route path='documents' element={<DocumentsOffered />} />
                <Route path='events/create' element={<A_EventCreate />} />
                <Route path='events/:id' element={<Institution_View/>} />
                <Route path='events/:id/edit' element={<A_EventCreate />} />
                <Route path='events/:id/certgen' element={<MintTransfer />} />
                <Route path='certificates' element={<CertificateGenerateEventsList />} />
                <Route path='certificates/event/:id' element={<MintTransfer />} />
			</Route>

            <Route path='*' element={<Error />}/>

		</Routes>
	);
}

export default App;

{
	/* Routes for members */
}
{
	/* <Route element={<ProtectedRoutes allowedRoles={'members'}/>}>
        <Route path='/member' element={<MemberPanel/>}>
          <Route path="dashboard" element={<Dashboard/>}/>

          <Route path="credential" element={<Credential/>}/>
          <Route path="credential/view" element={<Credential_View/>}/>

          <Route path="event" element={<Event/>}/>
          <Route path="event/view/:id" element={<Event_View/>}/>

          <Route path=":id" element={<MemberView/>}/>
        </Route>
      </Route> */
}

{
	/* Routes for Admin */
}
{
	/* <Route element={<ProtectedRoutes allowedRoles={[ROLES.admin]}/>}>
        <Route path='/admin' element={<AdminPanel/>}>
          <Route path="accountants" element={<Error404/>}/>
          <Route path="analytics" element={<Error404/>}/>
          <Route path="accountants" element={<Error404/>}/>
        </Route>

        <Route path='/event' element={<A_Event/>}>
          <Route path=":id" element={<A_EventCreate/>}/>
          <Route path=":id/edit" element={<A_EventCreate/>}/>
          <Route path="create" element={<A_EventCreate/>}/>
        </Route>

      </Route> */
}

{
	/* Routes for Accountant */
}
{
	/* <Route element={<ProtectedRoutes allowedRoles={[ROLES.accountant]}/>}> */
}
{
	/* Insert routes here */
}
{
	/* </Route> */
}

{
	/* Routes for Organizer  */
}
{
	/* <Route element={<ProtectedRoutes allowedRoles={[ROLES.organizer]}/>}> */
}
{
	/* Insert routes here */
}
{
	/* </Route> */
}

{
	/* Routes for Admin & Member*/
}
{
	/* <Route element={<ProtectedRoutes allowedRoles={[ROLES.admin, ROLES.member]}/>}> */
}
{
	/* Insert routes here */
}
{
	/* </Route> */
}

{
	/* Routes for Admin & Accountant*/
}
{
	/* <Route element={<ProtectedRoutes allowedRoles={[ROLES.admin, ROLES.accountant]}/>}> */
}
{
	/* Insert routes here */
}
{
	/* </Route> */
}

{
	/* Routes for Admin & Organizer*/
}
{
	/* <Route element={<ProtectedRoutes allowedRoles={[ROLES.admin, ROLES.organizer]}/>}> */
}
{
	/* Insert routes here */
}
{
	/* </Route> */
}

{
	/* --------------------TEST---------------------- */
}
{
	/* <Route path='/Credential/' element={<Credential/>}/>
    <Route path='/Credential/View' element={<CredentialView/>}/> */
}

{
	/* <Route path="/Admin" element={<DashboardAdmin/>}/>
    <Route path="/Admin/Event" element={<EventAdmin/>}/>
    <Route path="/Admin/Event/Create" element={<EventCreate/>}/> */
}

{
	/* <Route element={<ProtectedRoutes/>}>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Route> */
}

// Public Routes
// /
// /getstarted
// /about
// /events
// /events/:id
// /:id
// /certificates/:id

// Protected Routes Member
// /u/dashboard
// /u/:id/edit
// /u/certificate

// Protected Routes Admin
// /a/dashboard
// /a/event/create
// /a/event/:id/edit
// /a/members
