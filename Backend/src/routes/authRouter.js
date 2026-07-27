const express = require('express');
const router = express.Router();

import { validateDto } from '../middleware/validateDto.middleware.js';
import { authenticate } from '../middleware/authenticate.middleware.js';
import { registerDto, loginDto, changePasswordDto, resetPasswordDto, requestPasswordResetDto } from '../dtos/authN/index.js';
import { register, login, deleteAccount, resetPassword, requestPasswordReset, changePassword, logout } from '../controller/AuthN/authController.js';

//Register - DONE
router.post('/register', validateDto(registerDto), register);

//Login - DONE
router.post('/login', validateDto(loginDto), login);

//Delete Account (User) - DONE
router.post('/delete', authenticate, deleteAccount);

//Request Password Reset - DONE
router.post('/requestPasswordReset', validateDto(requestPasswordResetDto), requestPasswordReset)

//Reset Password - DONE
router.post('/resetPassword', authenticate, validateDto(resetPasswordDto), resetPassword);

//Change Password - DONE
router.post('/changePassword', authenticate, validateDto(changePasswordDto), changePassword);

//Logout - DONE
router.post('/logout', authenticate, logout);