import React, { useState } from 'react';

import './LandingPage.scss';

import DianneImg from './../../images/Resources/Developers/Dianne.jpg';
import JonImg from './../../images/Resources/Developers/Jon.jpg';
import HaroldImg from './../../images/Resources/Developers/Harold.jpg';

import Header from '../../layouts/NavBar/NavBar.js';
import Footer from '../../layouts/Footer/Footer';

import CertificatePicture from '../../images/Resources/Design/Certification.png';
import LostPicture from '../../images/Resources/Design/Lost.png'
import searchPicture from '../../images/Resources/Design/search.png'
import UploadPicture from '../../images/Resources/Design/upload.png'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
function LandingPage() {
	const [openTab, setopenTab] = useState('');

    const array = []



	return (
		<>
			<div id='LandingPage'>
				<div id='Container_LandingPage'>
					<div id='Main'>
						<div id='MainBackground'>
							
						</div>
						<div id='Container_Content_Main'>
							<div>
								<h3 className='Title'>iCertify is a safe authentic way to provide digital certification</h3>
								<h5>
									Integrates NFT and Blockchain Technology
								</h5>
								<a href='#home' onClick={()=>alert()}>Learn More!</a>
							</div>
						</div>
					</div>
					{/* Sections  */}
					<div id='Container_Sections'>
						{/* Section #1 - What is iCertify*/}
						<section id='Container_Section1'>
							<div className='Container_Title_Section'>
								<h3>What is iCertify?</h3>
								<h6>
									We provide online digital certificates
									through implementing NFT and Blockchain
									technology to ensure both employees and
									employers that their certificates are
									authentic and free from falsification.
								</h6>
							</div>
							<div className='Container_Content_Section'>
								<div className='Title_Content_Section1'>
									<div>
										<h4>Full Digital Ownership</h4>
										<h5>
											iCertify’s digital documents are
											converted into Non-Fungible Tokens
											which are stored in your wallet
											having full ownership and control
											over it.
										</h5>
									</div>
								</div>
								<div className='Img_Content_Section1'>
									<img
										src={CertificatePicture}
										alt=''
									/>
								</div>
								
								<div className='Img_Content_Section1'>
									<img
										src={UploadPicture}
										alt=''
									/>
								</div>
								<div className='Title_Content_Section1'>
									<div>
										<h4>Stores Data in a Blockchain</h4>
										<h5>
											iCertify stores your data into a
											blockchain making your data secure
											from manipulation and deletion.
										</h5>
									</div>
								</div>
								<div className='Title_Content_Section1'>
									<div>
										<h4>
											Goodbye to Lost or Destroyed
											Documents
										</h4>
										<h5>
											Through iCertify, your documents are
											assured to be safe from being
											destroyed as it is stored digitally
											and is easily found since it is
											stored in your crypto wallet.
										</h5>
									</div>
								</div>
								<div className='Img_Content_Section1'>
									<img
										src={LostPicture}
										alt=''
									/>
								</div>
								<div className='Img_Content_Section1'>
									<img
										src={searchPicture}
										alt=''
									/>
								</div>
								
								<div className='Title_Content_Section1'>
									<div>
										<h4>Easy Verification of Documents</h4>
										<h5>
											With just a single QR scan away on an iCertify document, employers can now easily verify the authentication of their applicants documents.
										</h5>
									</div>
								</div>
								
								
								
							</div>
						</section>
						{/* Section #2 - Meet our team */}
						<section id='Container_Section2'>
							<div className='Container_Title_Section'>
								<h3>Meet our team</h3>
								<p>
									iCertify is created by a team of passionate goal-oriented students from STI College Marikina.
								</p>
							</div>
							<div className='Container_Content_Section'>
								<div id='Selected'>
									<img
										src={DianneImg}
										alt=''
									/>
									<h4 className='DevName'>
										Dianne Chrystalin Brandez
									</h4>
									<h5 className='DevRole'>Project Leader</h5>
									<p className='BodyText1'>
										Takes charge of responsibilities involving the planning and management of the whole project along with the writing of the documentation and development side of the website.
									</p>
								</div>
								<div id='Selected'>
									<img
										src={HaroldImg}
										alt=''
									/>
									<h4 className='DevName'>
										Harold James H. Castillo
									</h4>
									<h5 className='DevRole'>
										Front-End Developer
									</h5>
									<p className='BodyText1'>
										Responsible for handling the design aspects of the project such as user interface design, user experience, and graphic design along with the development of the front-end of the website.
									</p>
								</div>
								<div id='Selected'>
									<img
										src={JonImg}
										alt=''
									/>
									<h4 className='DevName'>
										Jon Angelo Llagas
									</h4>
									<h5 className='DevRole'>
										Back-End Developer
									</h5>
									<p className='BodyText1'>
										In charge of handling the back-end development side of the website along with the designing of database models, schemas, tables, and logic used in the overall system project.
									</p>
								</div>
							</div>
						</section>
						{/* Section #3 - Frequently Ask question*/}
						<section id='Container_Section3'>
							<div className='Container_Title_Section'>
								<h3>Frequently Ask Questions</h3>
								<p>
									Integrating NFT and Blockchain Technology
									for Academic Credentials Authenticity
								</p>
							</div>
							<div className='Container_Content_Section'>
								<div id='Holder_FAQ_Section'>
									<ul>
										<li
											className={
												openTab === 'FAQ1'
													? 'active'
													: ''
											}
											onClick={() =>
												openTab === 'FAQ1'
													? setopenTab('')
													: setopenTab('FAQ1')
											}
										>
											<h4>What is iCertify</h4>
											<svg
												id='Layer_1'
												data-name='Layer 1'
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 310.34 466.48'
											>
												<defs>
													<style></style>
												</defs>
												<path
													className='cls-1'
													d='M223.33,482.24a50,50,0,0,1-32.94-87.63l165.48-144.8L188.54,103.39a50,50,0,1,1,65.85-75.26L464.73,212.18a50,50,0,0,1,0,75.26L256.24,469.87A49.8,49.8,0,0,1,223.33,482.24Z'
													transform='translate(-171.46 -15.76)'
												/>
											</svg>
											<p>
												iCertify is a web application dedicated to providing a legitimate and authentic digital certification which can benefit both employees and employers.
											</p>
										</li>
										<li
											className={
												openTab === 'FAQ2'
													? 'active'
													: ''
											}
											onClick={() =>
												openTab === 'FAQ2'
													? setopenTab('')
													: setopenTab('FAQ2')
											}
										>
											<h4>How do I use iCertify?</h4>
											<svg
												id='Layer_1'
												data-name='Layer 1'
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 310.34 466.48'
											>
												<defs>
													<style></style>
												</defs>
												<path
													className='cls-1'
													d='M223.33,482.24a50,50,0,0,1-32.94-87.63l165.48-144.8L188.54,103.39a50,50,0,1,1,65.85-75.26L464.73,212.18a50,50,0,0,1,0,75.26L256.24,469.87A49.8,49.8,0,0,1,223.33,482.24Z'
													transform='translate(-171.46 -15.76)'
												/>
											</svg>
											<p>
												Simply signup on our page then join an event hosted by Bicol IT. Once your attendance to the event has been confirmed you can claim your certificate which will then be stored in your crypto wallet.
											</p>
										</li>
										<li
											className={
												openTab === 'FAQ3'
													? 'active'
													: ''
											}
											onClick={() =>
												openTab === 'FAQ3'
													? setopenTab('')
													: setopenTab('FAQ3')
											}
										>
											<h4>How to setup my wallet for iCertify?</h4>
											<svg
												id='Layer_1'
												data-name='Layer 1'
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 310.34 466.48'
											>
												<defs>
													<style></style>
												</defs>
												<path
													className='cls-1'
													d='M223.33,482.24a50,50,0,0,1-32.94-87.63l165.48-144.8L188.54,103.39a50,50,0,1,1,65.85-75.26L464.73,212.18a50,50,0,0,1,0,75.26L256.24,469.87A49.8,49.8,0,0,1,223.33,482.24Z'
													transform='translate(-171.46 -15.76)'
												/>
											</svg>
											<p>
											iCertify uses a crypto wallet called Metamask which can be downloaded here at <a href='https://metamask.io/download'>metamask.io/download</a>. Once you downloaded the extension to your browser, follow the instructions written by metamask for the setup. When you are done come back to iCertify to Get Started. 
											</p>
										</li>
										<li
											className={
												openTab === 'FAQ4'
													? 'active'
													: ''
											}
											onClick={() =>
												openTab === 'FAQ4'
													? setopenTab('')
													: setopenTab('FAQ4')
											}
										>
											<h4>How does iCertify proves a document is authentic?</h4>
											<svg
												id='Layer_1'
												data-name='Layer 1'
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 310.34 466.48'
											>
												<defs>
													<style></style>
												</defs>
												<path
													className='cls-1'
													d='M223.33,482.24a50,50,0,0,1-32.94-87.63l165.48-144.8L188.54,103.39a50,50,0,1,1,65.85-75.26L464.73,212.18a50,50,0,0,1,0,75.26L256.24,469.87A49.8,49.8,0,0,1,223.33,482.24Z'
													transform='translate(-171.46 -15.76)'
												/>
											</svg>
											<p>
												iCertify documents have a QR code which when scanned, redirects to a page of iCertify showing the transaction hash of the data being stored in a blockchain and details of the true owner of the document.
											</p>
										</li>
										<li
											className={
												openTab === 'FAQ5'
													? 'active'
													: ''
											}
											onClick={() =>
												openTab === 'FAQ5'
													? setopenTab('')
													: setopenTab('FAQ5')
											}
										>
											<h4>Is iCertify secure?</h4>
											<svg
												id='Layer_1'
												data-name='Layer 1'
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 310.34 466.48'
											>
												<defs>
													<style></style>
												</defs>
												<path
													className='cls-1'
													d='M223.33,482.24a50,50,0,0,1-32.94-87.63l165.48-144.8L188.54,103.39a50,50,0,1,1,65.85-75.26L464.73,212.18a50,50,0,0,1,0,75.26L256.24,469.87A49.8,49.8,0,0,1,223.33,482.24Z'
													transform='translate(-171.46 -15.76)'
												/>
											</svg>
											<p>
												iCertify uses blockchain technology which is one of the emerging technologies that proves to be difficult to hack due to the way it is designed it makes tampering of data and deletion almost impossible.</p>
										</li>
									</ul>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default LandingPage;
