import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IUser, IUserResponse } from "../../interfaces/users.interfaces";
import { listUsersSchema } from "../../schemas/users.schema";

const listUsersService = async (): Promise<IUserResponse[]> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const users: Array<User> = await userRepository.find();

  const listUsers = listUsersSchema.parse(users);

  return listUsers;
};

export { listUsersService };
