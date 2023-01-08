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
import Credential from './pages/Credential/Credential';
import CertificatePage from './pages/Credential/CredentialView.js';
import Event from './pages/Event/Events.js';
import Event_View from './pages/Event/EventView.js';
import JoinEvent from './pages/Event/EventJoin.js';
import Profile from './pages/Profile/Profile.js';
import ProfileUpdate from './pages/Profile/ProfileUpdate';

// Admin
import AdminPanel from './routes/Admin.js';
import A_Event from './pages/Event/Admin/EventsAdmin.js';
import A_EventCreate from './pages/Event/Admin/EventCreate.js';
import CertificateGenerator from './pages/CertificateGenerator/CertificateGenerator.js';
import MintTransfer from './pages/MintTransfer/MintTransfer.js';

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
			<Route
				path='*'
				element={<Error />}
			/>
			<Route
				path='/'
				element={<LandingPage />}
			/>
			<Route
				path='/getstarted'
				element={<GetStarted />}
			/>

			<Route
				path='/certificate'
				element={<CertificateComponent />}
			/>

			<Route
				path='/member'
				element={<MemberPanel />}
			>
				<Route
					path='dashboard'
					element={<Dashboard />}
				/>
				<Route
					path='certificate/:id'
					element={<CertificatePage />}
				/>
				<Route
					path='credential'
					element={<Credential />}
				/>
				<Route
					path='event'
					element={<Event />}
				/>
				<Route
					path='event/:id'
					element={<Event_View />}
				/>
				<Route
					path='event/:id/join'
					element={<JoinEvent />}
				/>
				<Route
					path=':id'
					element={<Profile />}
				/>
				<Route
					path=':id/edit'
					element={<ProfileUpdate />}
				/>
			</Route>

			<Route
				path='/admin'
				element={<AdminPanel />}
			>
				<Route
					path='event'
					element={<A_Event />}
				/>
				<Route
					path='event/:id/certificate/generate'
					element={<MintTransfer />}
				/>
				<Route
					path='mintTransfer'
					element={<MintTransfer />}
				/>
				<Route
					path='event/create'
					element={<A_EventCreate />}
				/>
				<Route
					path='event/:id/edit'
					element={<A_EventCreate />}
				/>
				<Route
					path='certificate/generate'
					element={<CertificateGenerator />}
				/>
			</Route>

			<Route
				path='/Public'
				element={<PublicPanel />}
			>
				<Route
					path='event/:id'
					element={<Event_View />}
				/>
			</Route>
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
