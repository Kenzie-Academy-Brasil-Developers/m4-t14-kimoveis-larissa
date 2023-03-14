import { Request, Response } from "express";
import { ICategory } from "../interfaces/categories.interfaces";
import createCategoryService from "../services/categories/createCategory.service";
import { listCategoriesService } from "../services/categories/listCategories.service";
import { listCategoriesAndRealEstateService } from "../services/categories/listCategoriesAndRealEstate.service";

const createCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryData: ICategory = req.body;

  const newCategory = await createCategoryService(categoryData);

  return res.status(201).json(newCategory);
};

const listCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const listCategory: ICategory[] = await listCategoriesService();

  return res.status(200).json(listCategory);
};

const listCategoriesAndRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryId: number = +req.params.id;

  const listRealEstateByCategory = await listCategoriesAndRealEstateService(
    categoryId
  );

  return res.status(200).json(listRealEstateByCategory);
};

export {
  createCategoryController,
  listCategoriesController,
  listCategoriesAndRealEstateController,
};
