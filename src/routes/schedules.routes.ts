import { Router } from "express";
import {
  createScheduleController,
  listSchedulesController,
} from "../controllers/schedules.controller";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdmin.middleware";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { scheduleCreateSchema } from "../schemas/schedules.schema";

const scheduleRoutes: Router = Router();

scheduleRoutes.post(
  "/",
  ensureTokenIsValidMiddleware,
  ensureDataIsValidMiddleware(scheduleCreateSchema),
  createScheduleController
);
scheduleRoutes.get(
  "/realEstate/:id",
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  listSchedulesController
);

export { scheduleRoutes };
