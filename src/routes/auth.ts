import { Router } from 'express';
import {
    signIn,
    signUp,
    updatePassword,
} from '../controller/auth';

const router = Router();

router.post('/sign-up', signUp);

router.post('/sign-in', signIn);

router.patch('/change-pass/:email', updatePassword);

export default router;