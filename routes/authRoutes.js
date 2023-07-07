import { Router } from 'express';

const router = Router();

import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/logout').get(logoutUser);

export default router;