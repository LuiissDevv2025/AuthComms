import AppError from './AppError.js';

export class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(message, 404);
    }
}

export class BadRequestError extends AppError {
    constructor(message = "Bad Request") {
        super(message, 400);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized access") {
        super(message, 401);
    }
}

export class ForbiddenError extends AppError {
    constructor(message = "Forbidden action") {
        super(message, 403);
    }
}

export class InternalServerError extends AppError {
    constructor(message = "Internal Server Error") {
        super(message, 500);
    }
}