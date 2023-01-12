import TodoListModel from '../models/todoListModel';
import { NotFoundError } from '../middlewares/errors/ApiErrors';

export default class TodoListService {
  private todoListModel: TodoListModel;

  constructor() {
    this.todoListModel = new TodoListModel();
  };

  public getList = async (id: number) => {
    const list = await this.todoListModel.getList(id);

    if(list === null) throw new NotFoundError('User not found!');

    return list;
  };

  public createTask = async (id: number, task: string) => {
    const newTask = await this.todoListModel.createTask(id, task);

    return newTask;
  };

  public updateTask = async (taskId: number, task: string) => {
    const upTask = await this.todoListModel.updateTask(taskId, task);


    return upTask;
  }

  public deleteTask = async (taskId: number) => {
    const removeTask = await this.todoListModel.deleteTask(taskId);
    console.log(removeTask);

    return removeTask;
  }
}
