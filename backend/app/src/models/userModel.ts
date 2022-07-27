import { PrismaClient } from '@prisma/client';

export default class UserModel {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public createUser = async (name: string, lastName: string, email: string, password: string) => {
    const create = await this.prisma.user.create({
      data: {
        name,
        lastName,
        email,
        password,
      },
    });

    return { id: create.id };
  };

  public findUser = async (email: string) => {
    const userExist = await this.prisma.user.findUnique({
      where: {
        email
      },
    });

    return userExist;
  };
};
