import { z } from "zod";
import {
  addressSchema,
  addressResponseSchema,
} from "../schemas/addresses.schema";

type IAddress = z.infer<typeof addressSchema>;
type IAddressResponse = z.infer<typeof addressResponseSchema>;

export { IAddress, IAddressResponse };
