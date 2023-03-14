import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const ensurePermissionsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loggedUser = req.user;

  if (loggedUser.admin !== true && loggedUser.id !== parseInt(req.params.id)) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export { ensurePermissionsMiddleware };
