import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authLimiter } from '@presentation/middlewares/SecurityMiddleware';

const router = Router();
const userController = new UserController();

router.post('/login', authLimiter, (req, res) => userController.login(req, res));
router.post('/register', authLimiter, (req, res) => userController.register(req, res));

export const userRoutes = router;