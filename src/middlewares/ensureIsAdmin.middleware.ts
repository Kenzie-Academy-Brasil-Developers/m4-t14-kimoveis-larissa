import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const ensureIsAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const isAdmin: boolean = req.user.admin;

  if (!isAdmin) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export { ensureIsAdminMiddleware };
