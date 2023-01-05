const { nanoid } = require('nanoid');
const { create } = require('ipfs-http-client');
const Hash = require('ipfs-only-hash');
const ethers = require('ethers');

const Certificate = require('../models/Certificate');
const Event = require('../models/Event');
const Member = require('../models/Member');
const { UnprocessableRequest, NotFound, Forbidden } = require('../miscellaneous/errors');

const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
const interface = new ethers.utils.Interface(require('../build/contracts/CertificateNFT.json').abi);

/**
 * Monitors the transaction every 30 secs
 * If transaction is mined, update the certificate
 *      with the nftID
 * Otherwise, continue to monitor
 */
const monitorTransaction = (hash) => {
    setTimeout(async () => {
        const receipt = await provider.getTransactionReceipt(hash);
        if(receipt) {
            const certificate = await Certificate.findOne({ hash });

            certificate.nftId = interface.parseLog(receipt.logs[2]).args.tokenId.toNumber();
            await certificate.save();

            return;
        }
        monitorTransaction(hash);
    }, 30 * 1000);
}

const saveCertificate = async (req, res, next) => {
    const { ipfsCID, title, hash, ownerAddress, eventId } = req.body;

    try {
        if(!(  title            && typeof title === 'string'
            && ipfsCID          && typeof ipfsCID === 'string'
            && hash             && typeof hash === 'string'
            && ownerAddress     && typeof ownerAddress === 'string'
            && eventId          && typeof eventId === 'string'
        )) throw new UnprocessableRequest();

        // Find member
        const member = await Member.findOne({ walletAddress: ownerAddress });
        if(!member) throw new NotFound('Address is not a member');

        // Find event
        const event = await Event.findOne({ eventId });
        if(!event) throw new NotFound('Event is not created yet');

        // Check if hash is valid
        const transactionHash = await provider.getTransaction(hash);
        if(!transactionHash) throw new Forbidden('Transaction not existing');

        // Monitor transaction
        monitorTransaction(hash);

        const certificate = await Certificate.create({
            certificateId: nanoid(8),
            ipfsCID,
            title,
            hash,
            dateReceived: Date.now(),
            owner: member._id,
            event: event._id
        });

        member.ownedCertificates.push(certificate._id);
        await member.save();

        res.status(201).json({
            message: 'Certificate recorded',
            certificateId: certificate.certificateId,
            uri: 'https://icertify.infura-ipfs.io/ipfs/' + ipfsCID
        })
    } catch (error) {
        next(error);
    }
}

const certificateIPFS = async (req, res, next) => {
    try {
        const { certificate: { mimetype, data } } = req.files;

        // Check file type
        if(mimetype !== 'image/png') throw new UnprocessableRequest();

        const imageHash = await Hash.of(data);

        // Check if certificate is already saved
        const certificate = await Certificate.findOne({ ipfsCID: imageHash })
        if(certificate) throw new Forbidden('Certificate already saved');

        // Create ipfs instance
        const ipfsClient = create({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https',
            headers: { authorization: 'Basic ' + Buffer.from(process.env.IPFS_ID + ':' + process.env.IPFS_SECRET).toString('base64') }
        });

        res.json(await ipfsClient.add({ content: data }));
        
    } catch (error) {
        next(error);
    }
}

const getCertificate = async (req, res, next) => {
    const { certificateId } = req.params;

    try {
        const certificate = await Certificate
            .findOne({ certificateId })
            .select('-_id -__v')
            .populate('owner', '-_id walletAddress name')
            .populate('event', '-_id eventId title')
            .exec();
        if(!certificate) throw new NotFound('Certificate is not created yet');

        res.status(200).json(certificate);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getCertificate,
    certificateIPFS,
    saveCertificate
}