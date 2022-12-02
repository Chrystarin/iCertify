const { nanoid } = require('nanoid');
const Certificate = require('../models/Certificate');
const Event = require('../models/Event');
const Member = require('../models/Member');
const { UnprocessableRequest, NotFound } = require('../miscellaneous/errors');
const { create } = require('ipfs-http-client');

const saveCertificate = async (req, res, next) => {
    const { nftId, title, hash, dateReceived, ownerAddress, eventId } = req.body;

    try {
        if(!(  nftId        && typeof nftId === 'number'
            && title        && typeof title === 'string'
            && hash         && typeof hash === 'string'
            && dateReceived && typeof dateReceived === 'number'
            && ownerAddress && typeof ownerAddress === 'string'
            && eventId      && typeof eventId === 'string'
        )) throw new UnprocessableRequest();

        // Find member
        const member = await Member.findOne({ walletAddress: ownerAddress });
        if(!member) throw new NotFound('Address is not a member');

        // Find event
        const event = await Event.findOne({ eventId });
        if(!event) throw new NotFound('Event is not created yet');

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
    const { certificate: { mimetype, data } } = req.files;

    try {
        if(mimetype !== 'image/png') throw new UnprocessableRequest();

        const ipfsClient = create({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https',
            headers: {
                authorization: 'Basic ' + Buffer.from(process.env.IPFS_ID + ':' + process.env.IPFS_SECRET).toString('base64')
            }
        });

        res.json(
            await ipfsClient.add({
                content: data
            })
        );
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