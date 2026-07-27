import userRepository from '../../repositories/user.repository';
import tokenRepository from '../../repositories/token.repository';
import { InternalServerError } from '../../errors/specificErrors';


export async function deleteAccountService(userData) {
    const { user_id, token } = userData;

    //invalidate token
    const token = await tokenRepository.invalidateToken(user_id, token);
    if (!token) {
        throw new InternalServerError("Failed to invalidate token");
    }

    //delete user
    const user = await userRepository.setActiveStatus(user_id, false);
    if (!user) {
        throw new InternalServerError("Failed to delete account");//assuming
    }

    return result;
} 