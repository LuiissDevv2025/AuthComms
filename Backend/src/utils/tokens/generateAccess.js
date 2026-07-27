const jwt = require('jsonwebtoken');
import { InternalServerError } from '../../errors/specificErrors';

export const generateAccessToken = (user_id) => {
    if (!user_id) {
        throw new InternalServerError("user_id missing");
    }

    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
        throw new InternalServerError("Secret key missing");
    }


    const payload = { user_id, type: 'access' };
    const options = { expiresIn: '15m' };

    return jwt.sign(payload, secret, options);
}