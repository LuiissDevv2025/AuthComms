import userRepository from '../../repositories/user.repository';
import {
    registerService, loginService, deleteAccountService,
    changePasswordService, logoutService,
    resetPasswordService, requestPasswordResetService
} from '../../services/AuthN/authServices';


//register
export const register = async (req, res, next) => {
    try {
        const servicePayload = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        };

        const result = await registerService(servicePayload);
        return res.status(201).json({ status: true, data: result });
    } catch (error) {
        next(error);
    }
}

//login
export const login = async (req, res, next) => {
    try {
        const servicePayload = {
            email: req.body.email,
            password: req.body.password
        };

        const result = await loginService(servicePayload);
        return res.status(201).json({ status: true, data: result });
    } catch (error) {
        next(error);
    }
}

//delete account
export const deleteAccount = async (req, res, next) => {
    try {
        const servicePayload = {
            user_id: req.user.user_id,
            token: req.token
        }

        const result = await deleteAccountService(servicePayload);
        return res.status(201).json({ status: true, data: result });
    } catch (error) {
        next(error);
    }
}

//requet password reset
export const requestPasswordReset = async (req, res, next) => {
    try {
        const servicePayload = {
            email: req.body.email
        };

        const result = requestPasswordResetService(servicePayload);
        result = "If an account with that email exists, a password reset link has been sent.";
        return res.status(201).json({ status: true, data: result });
    } catch (error) {
        next(error);
    }
}

//reset password
export const resetPassword = async (req, res, next) => {
    try {
        const servicePayload = {
            user_id: req.user.user_id,
            password: req.body.password
        };

        const result = await resetPasswordService(servicePayload);
        return res.status(201).json({ status: true, data: result });
    } catch (error) {
        next(error);
    }

}

//Change Password
export const changePassword = async (req, res, next) => {
    try {
        const servicePayload = {
            user_id: req.user.user_id,
            password: req.body.password
        };

        const result = await changePasswordService(servicePayload);
        return res.status(201).json({ status: true, data: result });
    } catch (error) {
        next(error);
    }
}

//log out
export const logout = async (req, res, next) => {
    try {
        const servicePayload = {
            user_id: req.user.user_id,
            token: req.token
        };

        const result = await logoutService(servicePayload);
        return res.status(201).json({ status: true, data: result });
    } catch (error) {
        next(error);
    }
}
