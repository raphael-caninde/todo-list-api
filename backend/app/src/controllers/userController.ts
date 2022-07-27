import { Request, Response, NextFunction } from 'express';
import UserService from '../services/userService';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { name, lastName, email, password } = req.body;

      const create = await this.userService.createUser(name, lastName, email, password);

      return res.status(201).json(create);
    } catch (error) {
      next(error);
    }
  };

  public userLogin = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { email, password } = req.body;

      const login = await this.userService.userLogin(email, password);

      return res.status(200).json(login);
    } catch (error) {
      next(error);
    }
  };
}
