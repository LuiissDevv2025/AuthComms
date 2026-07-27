import userRepository from '../../repositories/user.repository';
import tokenRepository from '../../repositories/token.repository';
import { hashedPassword } from '../../utils/index';
import { InternalServerError } from '../../errors/specificErrors';

export async function changePasswordService(data) {
    const { user_id, password } = data;

    const password_hash = hashedPassword(password);
    if (!password_hash) {
        throw new InternalServerError("Failed to encrypt password");
    }

    const result = await userRepository.updatePassword(user_id, password_hash);
    if (!result) {
        throw new InternalServerError("Failed to update password");
    }

    return result;
}