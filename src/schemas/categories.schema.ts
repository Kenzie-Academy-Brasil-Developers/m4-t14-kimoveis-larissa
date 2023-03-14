import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1).max(45),
});

const categoryResponseSchema = categorySchema.extend({
  id: z.number(),
});

const listCategoriesSchema = categoryResponseSchema.array();

export { categorySchema, categoryResponseSchema, listCategoriesSchema };
