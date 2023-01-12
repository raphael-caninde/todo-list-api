import { Router } from 'express';
import TodoListController from '../controllers/todoListController';

const router = Router();
const taskConttroller = new TodoListController();

router.get('/:id', taskConttroller.getList);

router.post('/', taskConttroller.createTask);

router.patch('/', taskConttroller.updateTask);

router.delete('/', taskConttroller.deleteTask);

export default router;
