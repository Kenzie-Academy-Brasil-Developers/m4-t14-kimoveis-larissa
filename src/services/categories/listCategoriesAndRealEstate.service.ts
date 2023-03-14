import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category, RealEstate } from "../../entities";
import { AppError } from "../../errors";
import { categoryResponseSchema } from "../../schemas/categories.schema";
import { IRealEstateCategory } from "../../interfaces/realEstate.interfaces";

const listCategoriesAndRealEstateService = async (categoryId: number) => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCategory = await categoryRepository.findOneBy({
    id: categoryId,
  });
  if (!findCategory) {
    throw new AppError("Category not found", 404);
  }

  const validatedCategory = categoryResponseSchema.parse(findCategory);

  const realEstate = await realEstateRepository.find({
    where: {
      category: validatedCategory,
    },
  });

  const realEstateByCategory: IRealEstateCategory = {
    ...validatedCategory,
    realEstate,
  };

  return realEstateByCategory;
};

export { listCategoriesAndRealEstateService };
