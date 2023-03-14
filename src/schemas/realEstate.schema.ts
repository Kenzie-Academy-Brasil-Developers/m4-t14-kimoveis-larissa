import { z } from "zod";
import { addressSchema, addressResponseSchema } from "./addresses.schema";
import { listCategoriesSchema } from "./categories.schema";

const realEstateSchema = z.object({
  value: z.number().positive().or(z.string()),
  size: z.number().int().positive(),
  address: addressSchema,
  categoryId: z.number().int().nullish(),
});

const realEstateResponseSchema = realEstateSchema.extend({
  id: z.number(),
  sold: z.boolean().default(false),
  value: z.number().positive().or(z.string()),
  size: z.number().int().positive(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const listRealEstatesSchema = realEstateResponseSchema.array();

export { realEstateSchema, realEstateResponseSchema, listRealEstatesSchema };
