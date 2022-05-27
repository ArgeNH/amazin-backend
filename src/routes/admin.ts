import { Router } from 'express';
import { check } from 'express-validator';

import { validate } from '../middlewares';
import { getUsersBlocked, unlockUser } from '../controller/admin';

const router = Router();

router.post('/unlock-user', [
    check('email').notEmpty().withMessage('The email is required')
        .isEmail().withMessage('The email is invalid'),
    validate
], unlockUser);

router.get('/users-blocked', getUsersBlocked);

export { router as admin };