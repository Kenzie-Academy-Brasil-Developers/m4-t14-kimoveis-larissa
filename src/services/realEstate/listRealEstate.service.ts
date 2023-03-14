import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { IRealEstateList } from "../../interfaces/realEstate.interfaces";
import { listRealEstatesSchema } from "../../schemas/realEstate.schema";

const listRealEstateService = async (): Promise<IRealEstateList> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const listRealEstate = await realEstateRepository.find({
    relations: {
      address: true,
      category: true,
    },
  });

  const realEstateList: IRealEstateList =
    listRealEstatesSchema.parse(listRealEstate);

  return realEstateList;
};

export { listRealEstateService };
