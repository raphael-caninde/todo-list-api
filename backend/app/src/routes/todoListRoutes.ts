import { Router } from 'express';
import TodoListController from '../controllers/todoListController';
import checkToken from '../middlewares/validateToken';
import validInputs from '../middlewares/validateJoi';
import { inputTask } from '../middlewares/schema/taskValidate';

const router = Router();
const taskConttroller = new TodoListController();

router.get('/', checkToken, taskConttroller.getList);

router.post('/', checkToken, validInputs(inputTask), taskConttroller.createTask);

router.patch('/:id', checkToken, validInputs(inputTask), taskConttroller.updateTask);

router.delete('/:id', checkToken, taskConttroller.deleteTask);

export default router;
