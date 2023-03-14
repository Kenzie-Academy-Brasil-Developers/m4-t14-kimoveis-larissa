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

const categoryRouter: Router = Router();

categoryRouter.post(
  "",
  ensureDataIsValidMiddleware(categorySchema),
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  createCategoryController
);
categoryRouter.get("", listCategoriesController);
categoryRouter.get("/:id/realEstate", listCategoriesAndRealEstateController);

export { categoryRouter };
