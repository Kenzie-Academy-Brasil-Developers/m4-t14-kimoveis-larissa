import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { IUser, IUserResponse } from "../../interfaces/users.interfaces";
import { userResponseSchema } from "../../schemas/users.schema";

const createUserService = async (userData: IUser): Promise<IUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOne({
    where: {
      email: userData.email,
    },
  });

  if (findUser) {
    throw new AppError("Email already exists", 409);
  }

  const user: User = userRepository.create(userData);

  await userRepository.save(user);

  const newUser = userResponseSchema.parse(user);

  return newUser;
};

export default createUserService;
