import { Router } from 'express';
import {
    getUser,
    getUsers,
    updateUser,
    deleteUser
} from '../controller/user';

const router = Router();

router.get('/:email', getUser);

router.get('/', getUsers);

router.patch('/update/:email', updateUser);

router.delete('/delete/:email', deleteUser);

export default router;