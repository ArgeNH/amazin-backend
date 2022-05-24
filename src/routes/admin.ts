import { Router } from 'express';
import { unlockUser } from '../controller/admin';

const router = Router();

router.patch('/unlock-user', unlockUser);

export { router as admin };