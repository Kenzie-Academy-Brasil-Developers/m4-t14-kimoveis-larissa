import { z } from "zod";
import {
  categorySchema,
  categoryResponseSchema,
  listCategoriesSchema,
} from "../schemas/categories.schema";

type ICategory = z.infer<typeof categorySchema>;
type ICategoryResponse = z.infer<typeof categoryResponseSchema>;
type ICategoryList = z.infer<typeof listCategoriesSchema>;

export { ICategory, ICategoryResponse, ICategoryList };
