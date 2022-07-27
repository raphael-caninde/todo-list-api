import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();
const userController = new UserController();

router.post('/create', userController.createUser);

export default router;
