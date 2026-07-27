import userRepository from '../../repositories/user.repository';
import { hashedPassword } from '../../utils/index';
import { InternalServerError } from '../../errors/specificErrors';


export async function resetPasswordService(data) {
    const { user_id, password } = data;

    const password_hash = hashedPassword(password);
    if (!password_hash) {
        throw new InternalServerError("Failed to encrypt password");
    }

    //update password --> DB
    const user = userRepository.updatePassword(user_id, password_hash);

    if (!result) {
        throw new InternalServerError("Failed to update password");
    }

    return result;
}