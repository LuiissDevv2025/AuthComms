import { isValidPassword, areStringEqual } from '../../utils/index.js';
import { BadRequestError } from '../../errors/specificErrors.js';

class changePasswordDto {
    constructor(body) {
        this.password = body.password?.trim();
        this.confirmPassword = body.confirmPassword?.trim();
    }

    validate() {
        if (!this.password || !this.confirmPassword) {
            throw new BadRequestError("Missing Field");
        }

        if (!isValidPassword(this.password) || !isValidPassword(this.confirmPassword)) {
            throw new BadRequestError("Password does not meet standards");
        }

        if (!areStringEqual(this.password, this.confirmPassword)) {
            throw new BadRequestError("Password do not match");
        }

        return true;
    }
}

export default changePasswordDTO;