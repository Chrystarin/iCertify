const { nanoid } = require('nanoid');
const {
	UnprocessableRequest,
	NotFound,
	Forbidden
} = require('../miscellaneous/errors');
const Event = require('../models/Event');
const Member = require('../models/Member');

const filterRequestBody = ({
	type,
	title,
	description,
	link,
	location,
	date: { start, end },
	canClaimCertificate,
	status,
	isAcceptingVolunteer,
	tags,
	regularPrice,
	premiumPrice
}) => {
	// Validate required fields
	if (
		!(
			type &&
			typeof type === 'string' &&
			new Set(['online', 'onsite']).has(type) &&
			title &&
			typeof title === 'string' &&
			description &&
			typeof description === 'string' &&
			start &&
			typeof start === 'number' &&
			end &&
			typeof end === 'number' &&
			regularPrice &&
			typeof regularPrice === 'number' &&
			premiumPrice &&
			typeof premiumPrice === 'number'
		)
	)
		throw new UnprocessableRequest();

	var obj = {
		type,
		title,
		description,
		date: { start, end },
		regularPrice,
		premiumPrice
	};

	// Validate optional fields
	if (link !== undefined) {
		if (!(link && typeof link === 'string'))
			throw new UnprocessableRequest();
		Object.assign(obj, { link });
	}

	if (location !== undefined) {
		if (!(location && typeof location === 'string'))
			throw new UnprocessableRequest();
		Object.assign(obj, { location });
	}

	if (canClaimCertificate !== undefined) {
		if (!(typeof canClaimCertificate === 'boolean'))
			throw new UnprocessableRequest();
		Object.assign(obj, { canClaimCertificate });
	}

	if (status !== undefined) {
		if (
			!(status && typeof status === 'string') &&
			new Set(['draft', 'active', 'inactive']).has(status)
		)
			throw new UnprocessableRequest();
		Object.assign(obj, { status });
	}

	if (isAcceptingVolunteer !== undefined) {
		if (!(typeof isAcceptingVolunteer === 'boolean'))
			throw new UnprocessableRequest();
		Object.assign(obj, { isAcceptingVolunteer });
	}

	if (tags !== undefined) {
		if (!(tags instanceof Array)) throw new UnprocessableRequest();
		Object.assign(obj, { tags });
	}

	return obj;
};

const createEvent = async (req, res, next) => {
	try {
		console.log(req.body);

		const event = await Event.create({
			eventId: nanoid(8),
			...filterRequestBody(req.body)
		});

		console.log(event);

		res.status(201).json({
			message: 'Event created',
			eventId: event.eventId
		});
	} catch (error) {
		next(error);
	}
};

const joinEvent = async (req, res, next) => {
	const { eventId } = req.params;
	const { walletAddress, role } = req.body;

	try {
		if (
			!(
				walletAddress &&
				typeof walletAddress === 'string' &&
				role &&
				typeof role === 'string' &&
				new Set([
					'Organizer',
					'Speaker',
					'Guest',
					'Volunteer',
					'Participant'
				]).has(role)
			)
		)
			throw new UnprocessableRequest();

		// Find event
		const event = await Event.findOne({ eventId }).exec();
		if (!event) throw new NotFound('Event');

		// Find member
		const member = await Member.findOne({ walletAddress }).exec();
		if (!member) throw new NotFound('Member');

		// Check if member already joined
		if (
			event.participants.filter((p) => p.member.equals(member._id))
				.length > 0
		)
			throw new Forbidden('Member already joined');

		event.participants.push({ member: member._id, role });
		member.joinedEvents.push({ event: event._id, role });

		await event.save();
		await member.save();

		res.status(200).json({ message: 'Successfully joined to event' });
	} catch (error) {
		next(error);
	}
};

const getAllEvents = async (req, res, next) => {
	try {
		res.status(200).json(
			await Event.find()
				.select('-_id -__v -participants -requests')
				.exec()
		);
	} catch (error) {
		next(error);
	}
};

const getEvent = async (req, res, next) => {
	const { eventId } = req.params;

	try {
		const event = await Event.findOne({ eventId })
			.select('-_id -__v -participants -requests')
			.exec();
		if (!event) throw new NotFound('Event');

		res.status(200).json(event);
	} catch (error) {
		next(error);
	}
};

const getParticipants = async (req, res, next) => {
	const { eventId } = req.params;

	try {
		const event = await Event.findOne({ eventId })
			.select('-participants._id')
			.populate('participants.member', '-_id walletAddress name')
			.exec();
		if (!event) throw new NotFound('Event');

		res.status(200).json(event.participants);
	} catch (error) {
		next(error);
	}
};

const updateEvent = async (req, res, next) => {
	const { eventId } = req.params;

	try {
		const event = await Event.findOne({ eventId }).exec();
		if (!event) throw new NotFound('Event');

		Object.assign(event, filterRequestBody(req.body));
		await event.save();

		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createEvent,
	joinEvent,
	getAllEvents,
	getEvent,
	getParticipants,
	updateEvent
};
