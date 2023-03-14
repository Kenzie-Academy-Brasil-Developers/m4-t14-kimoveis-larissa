import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { ICategory } from "../../interfaces/categories.interfaces";
import { listCategoriesSchema } from "../../schemas/categories.schema";

const listCategoriesService = async (): Promise<ICategory[]> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categories: Category[] = await categoryRepository.find();

  const listCategory = listCategoriesSchema.parse(categories);

  return listCategory;
};

export { listCategoriesService };
