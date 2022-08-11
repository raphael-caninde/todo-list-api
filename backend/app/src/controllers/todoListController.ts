import { Request, Response, NextFunction } from 'express';
import TodoListService from '../services/todoListService';

export default class TodoListController {
  private todoListService: TodoListService;

  constructor() {
    this.todoListService = new TodoListService();
  }

  public getList = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { id } = req.params;

      const list = await this.todoListService.getList(+id);

      return res.status(200).json(list);
    } catch (error) {
      next(error);
    }
  };
}
