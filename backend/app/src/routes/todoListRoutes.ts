import { Router } from 'express';
import todoListModel from '../models/todoListModel';

const router = Router();
const listModel = new todoListModel();

router.get('/list/:id', async (req, res) => {
  const { id } = req.params;
  const get = await listModel.getList(+id);
  return res.status(200).json(get);
})

export default router;
