import { isValidEmail, isValidPassword, areStringEqual } from '../../utils/index.js';
import { BadRequestError } from '../../errors/specificErrors.js';


export default class registerDto {
    constructor(body) {
        this.email = body.email?.toLowerCase().trim();
        this.password = body.password?.trim();
        this.confirmPassword = body.confirmPassword?.trim();
    }

    //validate variables
    validate() {
        if (!this.email) {
            throw new BadRequestError("Missing Email");
        }
        if (!this.password) {
            throw new BadRequestError("Missing Password");
        }

        if (!isValidEmail(this.email)) {
            throw new BadRequestError("Invalid Email Format");
        }
        if (!isValidPassword(this.password)) {
            throw new BadRequestError("Invalid Password Format");
        }
        if (!areStringEqual(this.password, this.confirmPassword)) {
            throw new BadRequestError("Passwords do not match");
        }

        //no errors
        return true;
    }
}
