import tokenRepository from '../../repositories/token.repository';

export async function logoutService(data) {
    const { user_id, token } = data;
    const user_id = data.user_id;
    const token_string = data.token_string;

    //-->Repository
    const result = await tokenRepository.invalidateToken(user_id, token_string);

    if (!result) {
        throw new Error("Failed to revoke token");
    }

    return result;
}
