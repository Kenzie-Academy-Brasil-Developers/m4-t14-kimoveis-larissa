import { Request, Response } from "express";
import { ICategory } from "../interfaces/categories.interfaces";
import createCategoryService from "../services/categories/createCategory.service";

const createCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryData: ICategory = req.body;

  const newCategory = await createCategoryService(categoryData);

  return res.status(201).json(newCategory);
};

export { createCategoryController };
