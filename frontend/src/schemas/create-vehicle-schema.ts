import * as z from "zod";
import { baseVehicleSchema } from "@/schemas/base-vehicle-schema";
import { isAlphanumeric } from "@/lib/validation-helpers";

export const createVehicleSchema = baseVehicleSchema.extend({
  registrationNumber: z
    .string()
    .min(3, "Must be at least 3 characters")
    .max(20)
    .refine(isAlphanumeric, "Only letters and numbers are allowed"),
});
