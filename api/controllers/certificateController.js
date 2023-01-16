const { nanoid } = require('nanoid');
const { create } = require('ipfs-http-client');
const Hash = require('ipfs-only-hash');
const ethers = require('ethers');

const Certificate = require('../models/Certificate');
const Event = require('../models/Event');
const Member = require('../models/Member');
const {
	UnprocessableRequest,
	NotFound,
	Forbidden
} = require('../miscellaneous/errors');

const provider = new ethers.providers.JsonRpcProvider(
	process.env.TEST_PROVIDER + ':7545'
);
const interface = new ethers.utils.Interface(
	require('../build/contracts/CertificateNFT.json').abi
);

// Create ipfs instance
const ipfsClient = create({
	host: 'ipfs.infura.io',
	port: 5001,
	protocol: 'https',
	headers: {
		authorization:
			'Basic ' +
			Buffer.from(
				process.env.IPFS_ID + ':' + process.env.IPFS_SECRET
			).toString('base64')
	}
});
// const ipfsClient = create('http://127.0.0.1:5001');

const saveCertificate = async (req, res, next) => {
	const { certificateId } = req.body;
	let ipfsCID;

	try {
		// Check if certificateId is not included from the request body
		if (!certificateId) {
			const { _id, certificateId } = await Certificate.create({
				certificateId: nanoid(8)
			});

			// Check if generated certificateId was updated with info
			setTimeout(async () => {
				const certificate = await Certificate.findById(_id).exec();

				// If the ipfsCID of the generated certificate is empty, delete that certificate
				if (!certificate.ipfsCID) await certificate.delete();
			}, 1 * 60 * 1000);

			return res.status(201).json({ certificateId });
		}

		const { title, hash, ownerAddress, eventId } = req.body;
		({ ipfsCID } = req.body);

		if (
			!(
				certificateId &&
				typeof certificateId === 'string' &&
				title &&
				typeof title === 'string' &&
				ipfsCID &&
				typeof ipfsCID === 'string' &&
				hash &&
				typeof hash === 'string' &&
				ownerAddress &&
				typeof ownerAddress === 'string' &&
				eventId &&
				typeof eventId === 'string'
			)
		)
			throw new UnprocessableRequest();

		// Find member
		const member = await Member.findOne({ walletAddress: ownerAddress });
		if (!member) throw new NotFound('Address is not a member');

		// Find event
		const event = await Event.findOne({ eventId });
		if (!event) throw new NotFound('Event is not created yet');

		// Check if the member already owned a certificate from the event
		if (await Certificate.findOne({ owner: member._id, event: event._id }))
			throw new Forbidden(
				'Member already owned a certificate from this event'
			);

		// Check if hash is valid
		const transaction = await provider.getTransaction(hash);
		if (!transaction) throw new Forbidden('Transaction not existing');

		// Monitor transaction
		transaction.wait().then(({ logs: [log] }) => {
			Certificate.findOneAndUpdate(
				{ hash },
				{ nftId: interface.parseLog(log).args.tokenId.toNumber() },
                { new: true }
			);
		});

		const { _id } = await Certificate.findOneAndUpdate(
			{ certificateId },
			{
				ipfsCID,
				title,
				hash,
				dateReceived: Date.now(),
				owner: member._id,
				event: event._id
			}
		);

		member.ownedCertificates.push(_id);

		event.participants.find((p) =>
			p.member.equals(member._id)
		).certificateProcessed = true;

		await member.save();
		await event.save();

		res.json({
			message: 'Certificate recorded',
			certificateId,
			uri: 'https://icertify.infura-ipfs.io/ipfs/' + ipfsCID
		});
	} catch (error) {
		if (ipfsCID) {
			// Unpin image
			await ipfsClient.pin.rm(ipfsCID);

			// Garbage collect
			// ipfsClient.repo.gc();
		}

		next(error);
	}
};

const certificateIPFS = async (req, res, next) => {
	try {
		const {
			certificate: { mimetype, data }
		} = req.files;

		// Check file type
		if (mimetype !== 'image/png') throw new UnprocessableRequest();

		const imageHash = await Hash.of(data);

		// Check if certificate is already saved
		const certificate = await Certificate.findOne({ ipfsCID: imageHash });
		if (certificate) throw new Forbidden('Certificate already saved');

		res.json(await ipfsClient.add({ content: data }));
	} catch (error) {
		next(error);
	}
};

const getCertificate = async (req, res, next) => {
	const { certificateId } = req.params;

	try {
		const certificate = await Certificate.findOne({ certificateId })
			.select('-_id -__v')
			.populate('owner', '-_id walletAddress name')
			.populate('event', '-_id eventId title')
			.exec();
		if (!certificate) throw new NotFound('Certificate is not created yet');

		res.status(200).json(certificate);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getCertificate,
	certificateIPFS,
	saveCertificate
};
