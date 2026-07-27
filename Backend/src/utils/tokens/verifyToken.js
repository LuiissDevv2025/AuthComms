const jwt = require('jsonwebtoken');
const secret = process.env.JWT_ACCESS_SECRET;
import { UnauthorizedError, MissingDataError, InternalServerError } from '../../errors/specificErrors';

export const verifyAccessToken = (token) => {
    if (!token) {
        throw new UnauthorizedError('Token is required');
    }

    const secret = process.env.JWT_REFRESH_SECRET;

    if (!secret) {
        throw new InternalServerError('Secrey Key Missing');
    }

    try {
        return jwt.verify(token, secret);//return payload
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new UnauthorizedError('Token has expired');
        }
        if (error.name === 'JsonWebTokenError') {
            throw new UnauthorizedError('Token verification failed');
        }

        //Fallback - base case
        throw new UnauthorizedError('Invalid or unverified token');
    }
}
