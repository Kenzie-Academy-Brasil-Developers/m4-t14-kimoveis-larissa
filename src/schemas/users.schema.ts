import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(1).max(45),
  email: z.string().email().max(45),
  admin: z.boolean().default(false),
  password: z.string().min(1).max(120),
});

const userCreatedSchema = userSchema.extend({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullish().default(null),
});

const userResponseSchema = userCreatedSchema.omit({
  password: true,
});

const userUpdateSchema = userCreatedSchema.partial().omit({
  admin: true,
});

const listUsersSchema = userResponseSchema.array();

export {
  userCreatedSchema,
  userSchema,
  userUpdateSchema,
  userResponseSchema,
  listUsersSchema,
};
