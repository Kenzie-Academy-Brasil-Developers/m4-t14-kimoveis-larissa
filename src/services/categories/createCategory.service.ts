import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors";
import {
  ICategory,
  ICategoryResponse,
} from "../../interfaces/categories.interfaces";
import { categoryResponseSchema } from "../../schemas/categories.schema";

const createCategoryService = async (
  categoryData: ICategory
): Promise<ICategoryResponse> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCategory = await categoryRepository.findOne({
    where: {
      name: categoryData.name,
    },
  });

  if (findCategory) {
    throw new AppError("Category's name already exists", 409);
  }

  const category: Category = categoryRepository.create(categoryData);

  await categoryRepository.save(category);

  const newCategory = categoryResponseSchema.parse(category);

  return newCategory;
};

export default createCategoryService;
