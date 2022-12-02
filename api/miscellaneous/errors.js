class NotFound extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFound';
        this.status = 404;
    }
}

class UnprocessableRequest extends Error {
    constructor() {
        super('Invalid request body')
        this.name = 'UnprocessableRequest';
        this.status = 422;
    }
}

class Unauthorized extends Error {
    constructor(message) {
        super(message);
        this.name = 'Unauthorized';
        this.status = 401;
    }
}

class Forbidden extends Error {
    constructor(message) {
        super(message);
        this.name = 'Forbidden';
        this.status = 403;
    }
}

module.exports = {
    NotFound,
    UnprocessableRequest,
    Unauthorized,
    Forbidden
}