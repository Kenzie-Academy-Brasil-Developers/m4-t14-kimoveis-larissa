import { Router } from "express";
import {
  createRealEstateController,
  listRealEstateController,
} from "../controllers/realEstate.controller";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { realEstateSchema } from "../schemas/realEstate.schema";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdmin.middleware";

const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "/",
  ensureDataIsValidMiddleware(realEstateSchema),
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  createRealEstateController
);
realEstateRoutes.get("/", listRealEstateController);

export default realEstateRoutes;
