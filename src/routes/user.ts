import { Router } from 'express';
import { check } from 'express-validator';

import {
    getUser,
    getUsers,
    updateUser,
    deleteUser
} from '../controller/user';
import { validate } from '../middlewares/paramValidator';

const router = Router();

router.get('/:email',
    [
        check('email').notEmpty().withMessage('The email is required')
            .isEmail().withMessage('The email is invalid'),
        validate
    ], getUser);

router.get('/', getUsers);

router.patch('/update/:email',
    [
        check('email').notEmpty().withMessage('The email is required')
            .isEmail().withMessage('The email is invalid'),
        validate
    ], updateUser);

router.delete('/delete/:email',
    [
        check('email').notEmpty().withMessage('The email is required')
            .isEmail().withMessage('The email is invalid'),
        validate
    ], deleteUser);

export default router;