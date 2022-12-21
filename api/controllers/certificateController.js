const { nanoid } = require('nanoid');
const Certificate = require('../models/Certificate');
const Event = require('../models/Event');
const Member = require('../models/Member');
const { UnprocessableRequest, NotFound, Forbidden } = require('../miscellaneous/errors');
const { create } = require('ipfs-http-client');
const Hash = require('ipfs-only-hash');

const saveCertificate = async (req, res, next) => {
    const { nftId, ipfsCID, title, hash, dateReceived, ownerAddress, eventId } = req.body;

    try {
        if(!(  nftId            && typeof nftId === 'number'
            && title            && typeof title === 'string'
            && ipfsCID          && typeof ipfsCID === 'string'
            && hash             && typeof hash === 'string'
            && dateReceived     && typeof dateReceived === 'number'
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

        const certificate = await Certificate.create({
            certificateId: nanoid(8),
            nftId,
            title,
            hash,
            dateReceived,
            owner: member._id,
            event: event._id
        });

        res.status(201).json({
            message: 'Certificate recorded',
            certificateId: certificate.certificateId
        })
    } catch (error) {
        next(error);
    }
}

const certificateIPFS = async (req, res, next) => {
    // console.log(req.headers);

    try {
        const { certificate: { mimetype, data } } = req.files;

        // Check file type
        // if(mimetype !== 'image/png') throw new UnprocessableRequest();

        // Check if the generated hash is unique
        // const certificate = await Certificate.findOne({ ipfsCID: await Hash.of(data) })
        // if(certificate) throw new Forbidden('Certificate is already existing');

        // Create ipfs instance
        const ipfsClient = create({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https',
            headers: {
                authorization: 'Basic ' + Buffer.from(process.env.IPFS_ID + ':' + process.env.IPFS_SECRET).toString('base64')
            }
        });

        const hash = await Hash.of(data);
        const getImage = ipfsClient.cat(hash);
        const exists = ipfsClient.get(hash).next();
        // console.log(ipfsClient.files.ls)
        console.log(getImage);
        for await (const file of getImage) {
            console.log(file);
        }

        // console.log(exists);

        // res.json(await ipfsClient.add({ content: data }));
        res.json({});
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