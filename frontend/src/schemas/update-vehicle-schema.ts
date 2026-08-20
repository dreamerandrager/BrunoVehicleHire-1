import * as z from "zod";
import { VEHICLE_TYPES } from "@/constants/vehicle-types";
import { VEHICLE_COLOURS } from "@/constants/vehicle-colours";
import { VEHICLE_CONDITIONS } from "@/constants/vehicle-conditions";
import { isPersonName, isWordsOfLettersAndDigits } from "@/lib/validation-helpers";

export const updateVehicleSchema = z.object({
  vehicleType: z.number().int().min(0).max(VEHICLE_TYPES.length - 1),
  make: z
    .string()
    .min(1, "Required")
    .max(30)
    .refine(isWordsOfLettersAndDigits, "Only letters, numbers, and single spaces are allowed"),
  model: z
    .string()
    .min(1, "Required")
    .max(30)
    .refine(isWordsOfLettersAndDigits, "Only letters, numbers, and single spaces are allowed"),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  colour: z.number().int().min(0).max(VEHICLE_COLOURS.length - 1),
  ownerName: z
    .string()
    .min(1, "Required")
    .max(60)
    .refine(isPersonName, "Only letters, spaces, hyphens, and apostrophes are allowed"),
  pricePerDay: z.number().positive("Must be greater than 0").max(50000, "Must be R50,000 or less"),
  condition: z.number().int().min(0).max(VEHICLE_CONDITIONS.length - 1),
});
