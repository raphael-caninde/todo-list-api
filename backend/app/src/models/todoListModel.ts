import { PrismaClient } from '@prisma/client';

export default class TodoListModel {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      log: ['query'],
    });
  }

  public getList = async (id: number) => {
    const list = await this.prisma.user.findUnique({
      where: { id },
      select: {
        name: true,
        list: {
          select: {
            id: true,
            task: true,
          },
        },
      },
    });

    return list;
  };

  public createTask = async (id: number, task: string) => {
    const newTask = await this.prisma.todoList.create({
      data: {
        userId: id,
        task,
      },
    });

    return {newTask};
  };

  public updateTask = async (taskId: number, task: string) => {
    const upTask = await this.prisma.todoList.update({
      where: {id: taskId},
      data: {
        task: task,
      },
    });

    return upTask;
  };

  public deleteTask = async (taskId: number) => {
    const removeTask = await this.prisma.todoList.delete({
      where: {
        id: taskId,
      }
    });

    return removeTask;
  };

  public findtask = async (taskId: number) => {
    const task = await this.prisma.todoList.findFirst({
      where: {
        id: taskId
      }
    });

    return task;
  };
}
