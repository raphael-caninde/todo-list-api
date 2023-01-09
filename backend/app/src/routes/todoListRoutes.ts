import { Router } from 'express';
import TodoListController from '../controllers/todoListController';

const router = Router();
const listConttroller = new TodoListController();

router.get('/list/:id', listConttroller.getList);

router.post('/create-task/:id', listConttroller.createTask);

router.patch('/update-task', listConttroller.updateTask);

export default router;
