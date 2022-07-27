import UserModel from '../models/userModel';
import bcrypt from 'bcryptjs';

export default class UserService {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  public createUser = async (name: string, lastName: string, email: string, password: string) => {
    const userExist = await this.userModel.findUser(email);

    if(userExist) throw new Error('user exist');

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
}
