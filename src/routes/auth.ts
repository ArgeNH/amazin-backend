import { Router } from 'express';
import { check, param } from 'express-validator';

import {
    revalidateToken,
    signIn,
    signUp,
    updatePassword,
} from '../controller/auth';
import { validate, validateToken } from '../middlewares';
import { passwordOptions } from '../utils';

const router = Router();

router.post('/sign-up',
    [
        check('name').notEmpty().withMessage('The name is required')
            .matches(/^[a-zA-Z ]+$/).withMessage('The name is invalid (only letters and spaces)'),
        check('lastName').notEmpty().withMessage('The last name is required ')
            .matches(/^[a-zA-Z ]+$/).withMessage('The last name is invalid (only letters and spaces)'),
        check('email').notEmpty().withMessage('The email is required')
            .isEmail().withMessage('The email is invalid')
            .isLength({ max: 40 }).withMessage('The email is very long (max 40 characters)'),
        validate
    ], signUp);

router.post('/sign-in',
    [
        check('email').notEmpty().withMessage('The email is required')
            .isEmail().withMessage('The email is invalid'),
        check('password', 'The password is required').notEmpty(),
        validate
    ], signIn);

router.patch('/change-pass/:email',
    [
        param('email').exists().withMessage('The email is required')
            .isEmail().withMessage('The email is invalid'),
        check('newPassword').notEmpty().withMessage('The new password is required')
            .isStrongPassword(passwordOptions).withMessage('The new password is not strong enough (min 8 characters, at least one uppercase, one lowercase, one number and one special character)'),
        validate
    ], updatePassword);

router.get('/renew', validateToken, revalidateToken);

export { router as auth };