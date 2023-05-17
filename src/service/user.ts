import User, { IUser, ILogin } from "../models/userModel";
import bcrypt from "bcrypt";
import * as mongoose from "mongoose";

class UserService {
  async create(data: IUser) {
    let user = await User.findOne({ email: data.email });

    if (user) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);

    user = await User.create({ ...data, password: hashedPassword });
    return user;
  }

  async login(data: ILogin) {}

  async get(id: string) {
    const user = await User.findOne({ _id: new mongoose.Types.ObjectId(id) });
    return user;
  }
}

export default UserService;
