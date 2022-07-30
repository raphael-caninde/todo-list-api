import UserModel from '../models/userModel';
import bcrypt from 'bcryptjs';
import NotFoundError from '../middlewares/errors/notFoundError';
import { tokenGenerate } from '../utils/token';

export default class UserService {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  public createUser = async (name: string, lastName: string, email: string, password: string) => {
    const userExist = await this.userModel.findUser(email);

    if(userExist) throw new NotFoundError('Email already exists!', 400);

    const salt = await bcrypt.genSalt(10);
	  const passwordHash = await bcrypt.hash(password, salt);

    const create = await this.userModel.createUser(
      name,
      lastName,
      email,
      password= passwordHash,
    );

    return create;
  };

  public userLogin = async (email: string, password: string) => {
    const user = await this.userModel.findUser(email);

    if(!user) throw new NotFoundError('Your email and/or password are invalid', 400);

    const passwordValid = bcrypt.compareSync(password, user.password);

    if(!passwordValid) throw new NotFoundError('Your email and/or password are invalid', 400);

    const token = tokenGenerate(user.id, email);

    return {
      user: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      },
      token,
    };
  };
}
