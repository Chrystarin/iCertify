import React, { useState } from 'react';

import './LandingPage.scss';
import ImagePlaceHolder from './../../images/placeholder/image_placeholder.jpg';

import DianneImg from './../../images/Resources/Developers/Dianne.jpg';
import JonImg from './../../images/Resources/Developers/Jon.jpg';
import HaroldImg from './../../images/Resources/Developers/Harold.jpg';

import Header from '../../layouts/NavBar/NavBar.js';
import Footer from '../../layouts/Footer/Footer';

function LandingPage() {
	const [openTab, setopenTab] = useState('');
	return (
		<>
			<Header />
			<div id='LandingPage'>
				<div id='Container_LandingPage'>
					<div id='Main'>
						<div id='Container_Img_Main'>
							<div>
								<img
									src={ImagePlaceHolder}
									alt=''
								/>
							</div>
						</div>
						<div id='Container_Content_Main'>
							<div>
								<h4 className='Title'>What is iCertify?</h4>
								<h6>
									We provide online digital certificates
									through implementing NFT and Blockchain
									technology to ensure both employees and
									employers that their certificates are
									authentic and free from falsification.
								</h6>
								<a href='#home'>Learn More!</a>
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
								<div className='Img_Content_Section1'>
									<img
										src={ImagePlaceHolder}
										alt=''
									/>
								</div>
								<div className='Img_Content_Section1'>
									<img
										src={ImagePlaceHolder}
										alt=''
									/>
								</div>
								<div className='Img_Content_Section1'>
									<img
										src={ImagePlaceHolder}
										alt=''
									/>
								</div>
								<div className='Title_Content_Section1'>
									<div>
										<h5>Full Digital Ownership</h5>
										<h6>
											iCertify’s digital documents are
											converted into Non-Fungible Tokens
											which are stored in your wallet
											having full ownership and control
											over it.
										</h6>
									</div>
								</div>
								<div className='Title_Content_Section1'>
									<div>
										<h5>Stores Data in a Blockchain</h5>
										<h6>
											iCertify stores your data into a
											blockchain making your data secure
											from manipulation and deletion.
										</h6>
									</div>
								</div>
								<div className='Title_Content_Section1'>
									<div>
										<h5>
											Goodbye to Lost or Destroyed
											Documents
										</h5>
										<h6>
											Through iCertify, your documents are
											assured to be safe from being
											destroyed as it is stored digitally
											and is easily found since it is
											stored in your crypto wallet.
										</h6>
									</div>
								</div>
							</div>
						</section>
						{/* Section #2 - Meet our team */}
						<section id='Container_Section2'>
							<div className='Container_Title_Section'>
								<h3>Meet our team</h3>
								<p>
									Integrating NFT and Blockchain Technology
									for Academic Credentials Authenticity
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
									<h5 className='DevRole'>LEADER</h5>
									<p className='BodyText1'>
										Lorem ipsum dolor sit amet consectetur
										adipisicing elit. Sed excepturi
										molestias ad.
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
										Lorem ipsum dolor sit amet consectetur
										adipisicing elit. Sed excepturi
										molestias ad.
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
										Lorem ipsum dolor sit amet consectetur
										adipisicing elit. Sed excepturi
										molestias ad.
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
											<h4>Title</h4>
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
												Lorem ipsum, dolor sit amet
												consectetur adipisicing elit.
												Recusandae sit praesentium
												impedit. Labore dolore, minima
												natus rerum eos nemo at non
												vitae quas animi enim quidem
												nesciunt earum dolorem saepe ab
												amet nam laboriosam. Illum
												aperiam, neque blanditiis
												voluptas unde iusto rerum,
												voluptatibus animi ratione
												doloremque voluptatem libero!
												Ab, nam dolore aspernatur non
												reiciendis animi incidunt
												asperiores repellat magni,
												exercitationem, in tempore
												maxime praesentium sint est unde
												ratione laborum aliquam
												laboriosam! Quibusdam, sit?
												Ipsum nobis facere dolorem vitae
												quam reprehenderit beatae
												quibusdam sint sunt harum,
												veniam consectetur. Similique
												sunt provident molestias
												voluptate, deserunt quaerat
												voluptates ea, perferendis
												doloribus et aspernatur.
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
											<h4>Title</h4>
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
												Lorem ipsum, dolor sit amet
												consectetur adipisicing elit.
												Recusandae sit praesentium
												impedit. Labore dolore, minima
												natus rerum eos nemo at non
												vitae quas animi enim quidem
												nesciunt earum dolorem saepe ab
												amet nam laboriosam. Illum
												aperiam, neque blanditiis
												voluptas unde iusto rerum,
												voluptatibus animi ratione
												doloremque voluptatem libero!
												Ab, nam dolore aspernatur non
												reiciendis animi incidunt
												asperiores repellat magni,
												exercitationem, in tempore
												maxime praesentium sint est unde
												ratione laborum aliquam
												laboriosam! Quibusdam, sit?
												Ipsum nobis facere dolorem vitae
												quam reprehenderit beatae
												quibusdam sint sunt harum,
												veniam consectetur. Similique
												sunt provident molestias
												voluptate, deserunt quaerat
												voluptates ea, perferendis
												doloribus et aspernatur.
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
											<h4>Title</h4>
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
												Lorem ipsum, dolor sit amet
												consectetur adipisicing elit.
												Recusandae sit praesentium
												impedit. Labore dolore, minima
												natus rerum eos nemo at non
												vitae quas animi enim quidem
												nesciunt earum dolorem saepe ab
												amet nam laboriosam. Illum
												aperiam, neque blanditiis
												voluptas unde iusto rerum,
												voluptatibus animi ratione
												doloremque voluptatem libero!
												Ab, nam dolore aspernatur non
												reiciendis animi incidunt
												asperiores repellat magni,
												exercitationem, in tempore
												maxime praesentium sint est unde
												ratione laborum aliquam
												laboriosam! Quibusdam, sit?
												Ipsum nobis facere dolorem vitae
												quam reprehenderit beatae
												quibusdam sint sunt harum,
												veniam consectetur. Similique
												sunt provident molestias
												voluptate, deserunt quaerat
												voluptates ea, perferendis
												doloribus et aspernatur.
											</p>
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
