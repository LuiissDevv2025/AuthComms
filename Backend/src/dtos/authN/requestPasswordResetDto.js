import { isValidEmail } from '../../utils/index.js';
import { BadRequestError } from '../../errors/specificErrors.js';

class requestPasswordResetDto {
    constructor(body) {
        this.email = body.email?.trim();
    }

    validate() {
        if (!this.email || !isValidEmail) {
            throw new BadRequestError("Issue with email format");
        }

        return true;
    }
}