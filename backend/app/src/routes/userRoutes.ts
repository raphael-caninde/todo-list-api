import { Router } from 'express';
import UserController from '../controllers/userController';
import validInputs from '../middlewares/validator';
import userValidation from '../middlewares/schema/userValidate';

const router = Router();
const userController = new UserController();

router.post('/create',validInputs(userValidation), userController.createUser);

export default router;
