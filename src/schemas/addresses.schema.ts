import { z } from "zod";

const addressSchema = z.object({
  street: z.string().min(1).max(45),
  zipCode: z.string().max(8),
  number: z.string().max(8).nullish(),
  city: z.string().min(1).max(20),
  state: z.string().max(2),
});

const addressResponseSchema = addressSchema.extend({
  id: z.number(),
});

export { addressSchema, addressResponseSchema };
