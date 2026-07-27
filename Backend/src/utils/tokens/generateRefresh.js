const jwt = require('jsonwebtoken');
import { InternalServerError } from '../../errors/specificErrors.js';

export const generateRefreshToken = (user_id) => {
    if (!user_id) {
        throw new InternalServerError("payload missing");
    }


    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) {
        throw new InternalServerError("Seret Key Missing");
    }

    const payload = { user_id, type: 'refresh' };
    const options = { expiresIn: '7d' };

    return jwt.sign(payload, secret, options);
}