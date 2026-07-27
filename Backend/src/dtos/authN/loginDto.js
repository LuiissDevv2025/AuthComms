import { isValidEmail, isValidPassword } from '../../utils/index.js';
import { BadRequestError } from '../../errors/specificErrors.js';

export default class loginDto { // Capitalized class name (best practice)
    constructor(body = {}) { // Default to empty object to prevent crashes if body is missing
        this.email = body.email?.toLowerCase().trim();
        this.password = body.password?.trim();
    }

    valid() {
        //Presence
        if (!this.email) {
            throw new BadRequestError("Missing Email");
        }

        if (!this.password) {
            throw new BadRequestError("Missing Password");
        }

        //validation
        if (!isValidEmail(this.email)) {
            throw new BadRequestError("Incorrect email format");
        }

        if (!isValidPassword(this.password)) {
            throw new BadRequestError("Incorrect password format");
        }

        //no errors
        return this;
    }
}
