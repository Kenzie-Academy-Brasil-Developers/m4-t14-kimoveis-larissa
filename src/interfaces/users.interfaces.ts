import { z } from "zod";
import {
  userSchema,
  userUpdateSchema,
  userResponseSchema,
  listUsersSchema,
} from "../schemas/users.schema";
import { DeepPartial } from "typeorm";

type IUser = z.infer<typeof userSchema>;
type IUserResponse = z.infer<typeof userResponseSchema>;
type IUsers = z.infer<typeof listUsersSchema>;
type IUserUpdated = z.infer<typeof userUpdateSchema>;
type IUserForUpdate = DeepPartial<IUser>;

export { IUser, IUserResponse, IUsers, IUserUpdated, IUserForUpdate };
