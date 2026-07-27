import userRepository from '../../repositories/user.repository';
import { generateAccessToken } from '../../utils/index.js';

//--->import send email via communication app

export async function requestPasswordResetService(data) {
    const { email } = data;

    //retreive user
    const user = await userRepository.findByEmail(email);
    if (!user) {
        return;
    }

    //generate stateless token
    const resetToken = generateAccessToken(user.user_id);

    //---> send email and attach token 
    /*
    await sendEmail({
            to: user.email,
            subject: "Password Reset Request",
            text: `Your reset link: https://yourapp.com/reset-password?token=${resetToken}`
        });
    */

    return;
}