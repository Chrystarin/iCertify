import { nanoid } from 'nanoid';
import Document from '../models/Document.js';
import Event from '../models/Event.js';
import Member from '../models/Member.js';
import { InvalidRequestBodyError, NotFoundError } from '../errors.js';
import { filterBody } from '../tools.js';

const saveDocument = async (req, res, next) => {
    const { walletAddress, eventId, documentDetails } = req.body;

    try {
        if(!(  walletAddress
            && eventId
            && documentDetails
            && typeof walletAddress === 'string'
            && typeof eventId === 'string'
            && typeof documentDetails === 'object'
        )) throw new InvalidRequestBodyError();

        const member = await Member.findOne({ walletAddress }).exec();
        if(!member) throw new NotFoundError('Member');

        const event = await Event.findOne({ eventId }).exec();
        if(!event) throw new NotFoundError('Event');

        const document = await Document.create({
            documentId: nanoid(8),
            ...filterBody(
                ['_id', '__V', 'documentId', 'owner', 'event'],
                req.body
            )
        });

        member.ownedDocuments.push(document._id);
        await member.save();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

const getDocument = async (req, res, next) => {
    const { documentId } = req.params;

    try {
        const document = await Document
            .findOne({ documentId })
            .select('-_id -__v')
            .populate('owner', 'walletAddress')
            .populate('event', 'eventId title')
            .exec();
        if(!document) throw new NotFoundError('Document');

        res.send(200).json(document);
    } catch (error) {
        next(error);
    }
}

export {
    saveDocument,
    getDocument
}