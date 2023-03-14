import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import {
  createUserController,
  deleteUserController,
  listUsersController,
  updateUserController,
} from "../controllers/users.controllers";
import { userSchema, userUpdateSchema } from "../schemas";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdmin.middleware";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists.middleware";
import { ensurePermissionsMiddleware } from "../middlewares/ensurePermissions.middlewares";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchema),
  createUserController
);
userRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  listUsersController
);
userRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(userUpdateSchema),
  ensureTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  ensurePermissionsMiddleware,
  updateUserController
);
userRoutes.delete(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  ensurePermissionsMiddleware,
  deleteUserController
);

export default userRoutes;
