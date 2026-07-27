import hashedPassword from '../../utils/index.js';
import userRepository from '../../repositories/user_repository.js';

export async function registerService(userData) {
    //Retreive Variables
    const { email, username, password } = userData;

    //1: User Exist
    const user = await userRepository.findByEmail(email);

    if (user) { throw new Error("User Already Exist"); }//bubble up errors --> controller

    //2: Hash & Create
    const password_hash = await hashedPassword(password);
    const result = await userRepository.createUser(email, username, password_hash);

    return result;
}