import { verifyAccessToken } from '../utils/index.js';
import { UnauthorizedError } from '../errors/specificErrors.js';



export const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        //read gemini explanation
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            throw new UnauthorizedError("Access token missing or malformed");
        }

        //Extact the token after 'Bearer'
        const token = authHeader.split(' ')[1];

        const decodedPayload = verifyAccessToken(token);
        if (decodedPayload.type !== 'access') {
            throw new UnauthorizedError("Invalid token type");
        }

        req.user = decodedPayload;
        req.token = token;
        next();

    } catch (error) {
        next(error); //Global  Error Handler
    }
}