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

const roles = ['admin', 'member'];

const loginMember = async (req, res, next) => {
	const { type, credentials } = req.body;
	let token;

	try {
		if (
			!(
				type &&
				typeof type === 'string' &&
				new Set(['email', 'metamask']).has(type) &&
				credentials &&
				credentials instanceof Array &&
				credentials.length == 2
			)
		)
			throw new UnprocessableRequest();

		if (new Set(credentials).has(''))
			throw new Unauthorized('Empty fields');

		if (type == 'email') {
			const [email, password] = credentials;

			const member = await Member.findOne({
				credentials: { email }
			}).exec();
			if (!member) throw new NotFound('Member');

			const isMatch = bcrypt.compare(
				password,
				member.credentials.password
			);
			if (!isMatch) throw new Unauthorized('Incorrect credentials');

			token = jwt.sign(
				{
					id: member._id,
					walletAddress: member.walletAddress,
					email,
					nonce: member.credentials.nonce,
					createdAt: Date.now()
				},
				process.env.JWT_SECRET,
				{ expiresIn: '30d' }
			);

			member.credentials.nonce = generateNonce();
			await member.save();
		}
		/**
		 * type: metamask
		 * credentials: [walletAddress, signature]
		 */
		if (type == 'metamask') {
			const [walletAddress, signature] = credentials;

			const member = await Member.findOne({ walletAddress }).exec();
			if (!member) throw new NotFound('Member');

			verifySignature(signature, walletAddress, member.credentials.nonce);

			token = jwt.sign(
				{
					id: member._id,
					walletAddress,
					email: member.credentials.email,
					nonce: member.credentials.nonce,
					createdAt: Date.now()
				},
				process.env.JWT_SECRET,
				{ expiresIn: '30d' }
			);

			member.credentials.nonce = generateNonce();
			await member.save();
		}

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

		res.status(200).json({ nonce: member.credentials.nonce });
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
			.select(Array.from(memberAcceptedEntries).join(' '))
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
		isPremium,
		name: { firstName, middleName, lastName, extension },
		about,
		occupation,
		contact: { mobile, telephone },
		location: { barangay, city, province, country }
	} = req.body;

	var obj = {};

	addProperty(isPremium, { isPremium }, 'boolean');
	addProperty(firstName, { name: { firstName } });
	addProperty(middleName, { name: { middleName } });
	addProperty(lastName, { name: { lastName } });
	addProperty(extension, { name: { extension } });
	addProperty(about, { about });
	addProperty(occupation, { occupation });
	addProperty(mobile, { contact: { mobile } });
	addProperty(telephone, { contact: { telephone } });
	addProperty(barangay, { location: { barangay } });
	addProperty(city, { location: { city } });
	addProperty(province, { location: { province } });
	addProperty(country, { location: { country } });

	try {
		const member = await Member.findOne({ walletAddress }).exec();
		if (!member) throw new NotFound('Member');

		Object.assign(member, obj);
		await member.save();

		res.sendStatus(204);
	} catch (error) {
		next(error);
	}

	function addProperty(string, output, type = 'string') {
		if (string !== undefined) {
			if (typeof string !== type) throw new UnprocessableRequest();
			Object.assign(obj, output);
		}
	}
};

const getJoinedEvents = async (req, res, next) => {
	const { walletAddress } = req.params;

	try {
		const member = await Member.findOne({ walletAddress })
			.select('-joinedEvents._id')
			.populate('joinedEvents.event', '-_id eventId title')
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

		res.status(200).json(member.ownedDocuments);
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
