import { z } from "zod";
import {
  realEstateSchema,
  realEstateResponseSchema,
  listRealEstatesSchema,
  realEstateCategorySchema,
} from "../schemas/realEstate.schema";

type IRealEstate = z.infer<typeof realEstateSchema>;
type IRealEstateResponse = z.infer<typeof realEstateResponseSchema>;
type IRealEstateCategory = z.infer<typeof realEstateCategorySchema>;
type IRealEstateList = z.infer<typeof listRealEstatesSchema>;

export {
  IRealEstate,
  IRealEstateResponse,
  IRealEstateCategory,
  IRealEstateList,
};
