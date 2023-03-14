import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { AppError } from "../../errors";
import {
  IRealEstate,
  IRealEstateResponse,
} from "../../interfaces/realEstate.interfaces";
import { realEstateResponseSchema } from "../../schemas/realEstate.schema";

const createRealEstateService = async (
  realEstateData: IRealEstate
): Promise<IRealEstateResponse> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const address: Address = addressRepository.create(realEstateData.address);

  const findAddress = await addressRepository.findOneBy({
    number: String(address.number),
  });

  if (findAddress) {
    throw new AppError("Address already exists", 409);
  }

  await addressRepository.save(address);

  const category: Category | null = await categoryRepository.findOneBy({
    id: realEstateData.categoryId!,
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const realEstate: RealEstate = realEstateRepository.create({
    ...realEstateData,
    address: address,
    category: category,
  });

  await realEstateRepository.save(realEstate);

  const newRealEstate: IRealEstateResponse =
    realEstateResponseSchema.parse(realEstate);

  return newRealEstate;
};

export { createRealEstateService };
