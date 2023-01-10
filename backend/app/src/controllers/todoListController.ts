import { Request, Response, NextFunction } from 'express';
import TodoListService from '../services/todoListService';

export default class TodoListController {
  private todoListService: TodoListService;

  constructor() {
    this.todoListService = new TodoListService();
  };

  public getList = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { id } = req.params;

      const list = await this.todoListService.getList(+id);

      return res.status(200).json(list);
    } catch (error) {
      next(error);
    }
  };

  public createTask = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { task } = req.body;
      const { id } = req.params;

      const newTask = await this.todoListService.createTask(+id, task);

      return res.status(201).json(newTask);
    } catch (error) {
      next(error);
    }
  };

  public updateTask = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { taskId, task } = req.body;

      const upTask = await this.todoListService.updateTask(taskId, task);

      return res.status(200).json(upTask);
    } catch (error) {
      next(error);
    }
  }
}
