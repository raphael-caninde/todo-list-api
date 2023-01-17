import TodoListModel from '../models/todoListModel';
import { NotFoundError } from '../middlewares/errors/ApiErrors';

export default class TodoListService {
  private todoListModel: TodoListModel;

  constructor() {
    this.todoListModel = new TodoListModel();
  };

  public getList = async (id: number) => {
    const list = await this.todoListModel.getList(id);

    return list;
  };

  public createTask = async (id: number, task: string) => {
    const newTask = await this.todoListModel.createTask(id, task);

    return newTask;
  };

  public updateTask = async (taskId: number, task: string) => {
    const getTask = await this.todoListModel.findtask(taskId);

    if(!getTask) throw new NotFoundError('Task not found!');

    const upTask = await this.todoListModel.updateTask(taskId, task);


    return upTask;
  }

  public deleteTask = async (taskId: number) => {
    const task = await this.todoListModel.findtask(taskId);

    if(!task) throw new NotFoundError('Task not found!');

    const removeTask = await this.todoListModel.deleteTask(taskId);


    console.log(removeTask + 'service');

    return removeTask;
  }
}
