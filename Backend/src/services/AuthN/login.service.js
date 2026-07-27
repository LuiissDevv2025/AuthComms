import userRepository from '../../repositories/user.repository';
import { verifyPassword, areStringEqual, generateAccessToken, generateRefreshToken } from '../../utils/index.js';


export async function loginService(userData) {
    const { email, password } = userData;

    //Get user
    const user = await userRepository.findByEmail(email);
    if (!user) { throw new Error("Account DNE"); }

    //Store vs Input
    const emailResult = areStringEqual(user.email, email);
    if (!emailResult) { throw new Error("Invalid Email"); }

    const passwordResult = verifyPassword(password, user.password_hash);
    if (!passwordResult) { throw new Error("Incorrect Password"); }

    //Tokens
    const accessToken = generateAccessToken(user.user_id);
    const refreshToken = generateRefreshToken(user.user_id);

    return { accessToken, refreshToken };
}