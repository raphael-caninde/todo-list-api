import { Router } from 'express';
import UserController from '../controllers/userController';
import validInputs from '../middlewares/validateJoi';
import { userValidation, login } from '../middlewares/schema/userValidate';

const router = Router();
const userController = new UserController();

router.post('/create',validInputs(userValidation), userController.createUser);

router.post('/login', validInputs(login), userController.userLogin);

export default router;
