import { Router } from 'express';
import todoListController from '../controllers/todoListController';

const router = Router();
const listConttroller = new todoListController();

router.get('/list/:id', listConttroller.getList);

export default router;
