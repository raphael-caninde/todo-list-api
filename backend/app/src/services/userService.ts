import UserModel from '../models/userModel';
import bcrypt from 'bcryptjs';
import { BadRequestError } from '../middlewares/errors/ApiErrors';
import { tokenGenerate } from '../utils/token';

export default class UserService {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  public createUser = async (name: string, lastName: string, email: string, password: string) => {
    const userExist = await this.userModel.findUser(email);

    if(userExist) throw new BadRequestError('E-mail ja existe!');

    const salt = await bcrypt.genSalt(10);
	  const passwordHash = await bcrypt.hash(password, salt);

    const create = await this.userModel.createUser(
      name,
      lastName,
      email,
      password = passwordHash,
    );

    return create;
  };

  public userLogin = async (email: string, password: string) => {
    const user = await this.userModel.findUser(email);

    if(!user) throw new BadRequestError('Seu e-mail e/ou senha são inválidos!');

    const passwordValid = bcrypt.compareSync(password, user.password);

    if(!passwordValid) throw new BadRequestError('Seu e-mail e/ou senha são inválidos');

    const token = tokenGenerate(user.id, email);

    return {
      user: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        token
      }
    };
  };
}
