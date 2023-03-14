import { z } from "zod";

const scheduleCreateSchema = z.object({
  date: z.string(),
  hour: z.string().max(10),
  realEstateId: z.number().int().positive(),
});

const scheduleResponseSchema = scheduleCreateSchema.extend({
  id: z.number(),
  userId: z.number().int(),
});

export { scheduleCreateSchema, scheduleResponseSchema };
