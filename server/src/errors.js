class NotFoundError extends Error {
    constructor(resource = '') {
        super(resource + ' not found');
        this.status = 404;
    }
}

class InvalidRequestBodyError extends Error {
    constructor() {
        super('Invalid request body')
        this.status = 422;
    }
}

class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
    }
}

export {
    NotFoundError,
    InvalidRequestBodyError,
    UnauthorizedError
}