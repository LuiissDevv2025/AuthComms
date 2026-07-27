import { areStringEqual, isValidPassword } from '../../utils/index.js';
import { BadRequestError } from '../../errors/specificErrors.js';

class resetPasswordDto {
    constructor(body) {
        this.password = body.password?.trim();
        this.confirmPassword = body.confirmPassword?.trim();
    }

    validate() {
        if (!this.password || !isValidPassword(this.password) || !this.confirmPassword || !isValidPassword(this.confirmPassword)) {
            throw new BadRequestError("Missing Fields");
        }

        if (!areStringEqual(this.password, this.confirmPassword)) {
            throw new BadRequestError("Passwords do not match");
        }

        return true;
    }
}

export default resetPasswordDTO;