import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import {
  IUserResponse,
  IUserForUpdate,
} from "../../interfaces/users.interfaces";
import { userResponseSchema } from "../../schemas/users.schema";

const updateUserService = async (
  newUserData: IUserForUpdate,
  idUser: number
): Promise<IUserResponse> => {
  console.log(newUserData);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldUserData = await userRepository.findOneBy({
    id: idUser,
  });

  if (newUserData.email) {
    const findUser = await userRepository.findOne({
      where: {
        email: newUserData.email,
      },
    });

    if (findUser) {
      throw new AppError("Email already exists", 409);
    }
  }

  const user = userRepository.create({
    ...oldUserData,
    ...newUserData,
  });

  await userRepository.save(user);

  const updatedUser = userResponseSchema.parse(user);

  return updatedUser;
};

export { updateUserService };
