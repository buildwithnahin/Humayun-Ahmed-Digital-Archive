import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();
const userController = new UserController();

router.get('/profile', requireAuth, userController.getProfile);

export default router;
