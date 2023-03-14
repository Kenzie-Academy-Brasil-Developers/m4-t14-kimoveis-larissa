import { Router } from "express";
import {
  createCategoryController,
  listCategoriesAndRealEstateController,
  listCategoriesController,
} from "../controllers/categories.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdmin.middleware";
import { categorySchema } from "../schemas";

const categoryRoutes: Router = Router();

categoryRoutes.post(
  "",
  ensureDataIsValidMiddleware(categorySchema),
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  createCategoryController
);
categoryRoutes.get("", listCategoriesController);
categoryRoutes.get("/:id/realEstate", listCategoriesAndRealEstateController);

export default categoryRoutes;
