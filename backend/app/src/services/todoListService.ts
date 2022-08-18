import TodoListModel from '../models/todoListModel';
import Error from '../middlewares/errors/Error';

export default class TodoListService {
  private todoListModel: TodoListModel;

  constructor() {
    this.todoListModel = new TodoListModel();
  };

  public getList = async (id: number) => {
    const list = await this.todoListModel.getList(id);

    if(list === null) throw new Error('User not found!', 404);

    return list;
  };

  public createTask = async (id: number, task: string) => {
    const newTask = await this.todoListModel.createTask(id, task);

    return newTask;
  };
}
