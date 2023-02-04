import { Router } from 'express';
import TodoListController from '../controllers/todoListController';
import checkToken from '../middlewares/validateToken'

const router = Router();
const taskConttroller = new TodoListController();

router.get('/', checkToken, taskConttroller.getList);

router.post('/', checkToken, taskConttroller.createTask);

router.patch('/', taskConttroller.updateTask);

router.delete('/', taskConttroller.deleteTask);

export default router;
