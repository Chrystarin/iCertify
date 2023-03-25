class NotFound extends Error {
	constructor(message) {
		super(message);
		this.name = 'NotFound';
		this.status = 404;
	}
}

class Forbidden extends Error {
	constructor(message) {
		super(message);
		this.name = 'ForbiddenAction';
		this.status = 403;
	}
}

class Unauthorized extends Error {
	constructor(message) {
		super(message);
		this.name = 'UnauthorizedAction';
		this.status = 401;
	}
}

class InvalidInput extends Error {
	constructor(message) {
		super(message);
		this.name = 'InvalidInput';
		this.status = 422;
	}
}

class InstitutionNotFound extends NotFound {
	constructor() {
		super('There is no such institution with that wallet address');
	}
}

class UserNotFound extends NotFound {
	constructor() {
		super('There is no such user with that wallet address');
	}
}

class MemberNotFound extends NotFound {
	constructor() {
		super('There is no such member with that wallet address');
	}
}

class DuplicateEntry extends Error {
	constructor(message) {
		super(message);
		this.name = 'DuplicateEntry';
		this.status = 409;
	}
}

module.exports = {
	NotFound,
	Forbidden,
	Unauthorized,
	InvalidInput,
	DuplicateEntry,
	InstitutionNotFound,
	UserNotFound,
	MemberNotFound
};
