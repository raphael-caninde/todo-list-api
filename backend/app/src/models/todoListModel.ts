import { PrismaClient } from '@prisma/client';

export default class TodoListModel {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public getList = async (id: number) => {
    const list = await this.prisma.user.findUnique({
      where: { id },
      select: {
        name: true,
        list: {
          select: {
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
}
