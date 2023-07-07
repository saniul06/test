import { Router } from 'express';
import { UserRole } from '../utils/constants.js';
import {
    createNewShow,
    getShows
} from '../controllers/showController.js';

import { isAuthenticated, authorizeRoles } from '../middlewares/auth.js';

const router = Router();

router.route('/admin/show').post(isAuthenticated, authorizeRoles(UserRole.admin), createNewShow)
router.route('/admin/show').get(isAuthenticated, getShows)


export default router
