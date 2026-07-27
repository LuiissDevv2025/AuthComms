const bcrypt = require('bcrypt');
import { InternalServerError } from '../../errors/specificErrors';

//Password Verification
export async function verifyPassword(enteredPassword, hashedPassword) {//proimse
    const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);
    return isMatch; //boolean
}

//Password Encryption
const SALT_ROUNDS = 10; //Standard

export async function hashedPassword(password) {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
}