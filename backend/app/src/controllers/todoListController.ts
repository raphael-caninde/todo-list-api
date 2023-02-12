import { Request, Response, NextFunction } from 'express';
import TodoListService from '../services/todoListService';

export default class TodoListController {
  private todoListService: TodoListService;

  constructor() {
    this.todoListService = new TodoListService();
  };

  public getList = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const id = req.user!.id;

      const list = await this.todoListService.getList(id);

      return res.status(200).json(list);
    } catch (error) {
      next(error);
    }
  };

  public createTask = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const id = req.user!.id;
      const { task, done } = req.body;

      const newTask = await this.todoListService.createTask(id, task, done);

      return res.status(201).json(newTask);
    } catch (error) {
      next(error);
    }
  };

  public updateTask = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const { task } = req.body;

      const upTask = await this.todoListService.updateTask(+id, task);

      return res.status(200).json(upTask);
    } catch (error) {
      next(error);
    }
  }

  public taskDone = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const { done } = req.body;

      const task = await this.todoListService.taskDone(+id, done);

      return res.status(200).json(task);

    } catch (error) {
      next(error);
    }
  }

  public deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { id } = req.params;

      await this.todoListService.deleteTask(+id);

      return res.status(200).json();
    } catch (error) {
      next(error);
    }
  }
}
