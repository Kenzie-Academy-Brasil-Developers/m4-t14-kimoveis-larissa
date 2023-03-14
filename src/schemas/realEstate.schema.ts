import { z } from "zod";
import { addressSchema, addressResponseSchema } from "./addresses.schema";
import { categoryResponseSchema } from "./categories.schema";

const realEstateSchema = z.object({
  value: z.number().positive().or(z.string()),
  size: z.number().int().positive(),
  address: addressSchema,
  sold: z.boolean().default(false),
  categoryId: z.number().optional(),
});

const realEstateResponseSchema = realEstateSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    address: addressResponseSchema,
    category: categoryResponseSchema,
  })
  .omit({
    categoryId: true,
  });

const listRealEstatesSchema = realEstateResponseSchema
  .omit({ category: true })
  .array();

const realEstateCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  realEstate: listRealEstatesSchema,
});

export {
  realEstateSchema,
  realEstateResponseSchema,
  listRealEstatesSchema,
  realEstateCategorySchema,
};
