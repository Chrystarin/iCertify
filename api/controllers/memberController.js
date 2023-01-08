const Member = require('../models/Member');
const bcrypt = require('bcrypt');
const { ethers } = require('ethers');
const jwt = require('jsonwebtoken');
const { generateNonce, verifySignature } = require('../miscellaneous/tools');
const {
	UnprocessableRequest,
	NotFound,
	Unauthorized
} = require('../miscellaneous/errors');

const memberAcceptedEntries = new Set([
	'walletAddress',
	'isPremium',
	'name',
	'about',
	'occupation',
	'contact',
	'location'
]);

const memberPublicInfo = [
	'walletAddress',
	'isPremium',
	'name',
	'about',
	'occupation',
	'contact',
	'location'
];

const loginMember = async (req, res, next) => {
	const { walletAddress, signature } = req.body;

	try {
		if (
			!(
				walletAddress &&
				typeof walletAddress === 'string' &&
				signature &&
				typeof signature === 'string'
			)
		)
			throw new UnprocessableRequest();

		const member = await Member.findOne({ walletAddress }).exec();
		if (!member) throw new NotFound('Member');

		verifySignature(signature, walletAddress, member.nonce);

		const token = jwt.sign(
			{
				id: member._id,
				walletAddress,
				nonce: member.nonce,
				createdAt: Date.now()
			},
			process.env.JWT_SECRET,
			{ expiresIn: '30d' }
		);

		member.nonce = generateNonce();
		await member.save();

		res.status(200)
			.cookie('access-token', token, {
				httpOnly: true,
				sameSite: 'none',
				secure: true
			})
			.json({
				message: 'Successfully logged in',
				userType: req.user
			});
	} catch (error) {
		next(error);
	}
};

const registerUser = async (req, res, next) => {
	const { walletAddress } = req.body;

	try {
		// Check if valid wallet address
		if (
			!(
				walletAddress &&
				typeof walletAddress === 'string' &&
				ethers.utils.isAddress(walletAddress)
			)
		)
			throw new Unauthorized('Invalid wallet address');

		// Create member
		const member = await Member.create({
			walletAddress: ethers.utils.getAddress(walletAddress)
		});

		res.status(201).json({
			message: 'Wallet address registered',
			walletAddress: member.walletAddress
		});
	} catch (error) {
		next(error);
	}
};

const userExisting = async (req, res, next) => {
	const { walletAddress } = req.params;

	try {
		const member = await Member.findOne({ walletAddress }).exec();
		res.status(200).json({ isExisting: !!member });
	} catch (error) {
		next(error);
	}
};

const getNonce = async (req, res, next) => {
	const { walletAddress } = req.params;

	try {
		const member = await Member.findOne({ walletAddress }).exec();
		if (!member) throw new NotFound('Member');

		res.status(200).json({ nonce: member.nonce });
	} catch (error) {
		next(error);
	}
};

const getAllMembers = async (req, res, next) => {
	try {
		const members = await Member.find()
			.select(Array.from(memberAcceptedEntries).join(' '))
			.exec();

		res.status(200).json(members);
	} catch (error) {
		next(error);
	}
};

const getMember = async (req, res, next) => {
	const { walletAddress } = req.params;

	try {
		const member = await Member.findOne({ walletAddress })
			.select(memberPublicInfo.join(' '))
			.exec();
		if (!member) throw new NotFound('Member');

		res.status(200).json(member);
	} catch (error) {
		next(error);
	}
};

const updateMember = async (req, res, next) => {
	const { walletAddress } = req.params;
	const {
		name: { firstName, middleName, lastName, extension },
		about,
		occupation,
		contact: { mobile, telephone },
		location: { city, province, country }
	} = req.body;

	try {
		if (
			!(
				firstName &&
				typeof firstName === 'string' &&
				lastName &&
				typeof lastName === 'string' &&
				city &&
				typeof city === 'string' &&
				province &&
				typeof province === 'string' &&
				country &&
				typeof country === 'string'
			)
		)
			throw new UnprocessableRequest();

		const member = await Member.findOne({ walletAddress }).exec();
		if (!member) throw new NotFound('Member');

		Object.assign(member, {
			name: { firstName, middleName, lastName, extension },
			about,
			occupation,
			contact: { mobile, telephone },
			location: { city, province, country }
		});
		await member.save();

		res.status(200).json({ message: 'Member details updated' });
	} catch (error) {
		next(error);
	}
};

const getJoinedEvents = async (req, res, next) => {
	const { walletAddress } = req.params;

	try {
		const member = await Member.findOne({ walletAddress })
			.populate('joinedEvents.event', 'eventId title')
			.exec();
		if (!member) throw new NotFound('Member');

		res.status(200).json(member.joinedEvents);
	} catch (error) {
		next(error);
	}
};

const getCertificates = async (req, res, next) => {
	const { walletAddress } = req.params;

	try {
		const member = await Member.findOne({ walletAddress })
			.populate('ownedCertificates')
			.exec();
		if (!member) throw new NotFound('Member');

		res.status(200).json(member.ownedCertificates);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	loginMember,
	getNonce,
	getAllMembers,
	getMember,
	updateMember,
	getJoinedEvents,
	getCertificates,
	registerUser,
	userExisting
};
