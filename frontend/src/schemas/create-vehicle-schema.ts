import * as z from "zod";
import { VEHICLE_TYPES } from "@/constants/vehicle-types";
import { VEHICLE_COLOURS } from "@/constants/vehicle-colours";

export const createVehicleSchema = z.object({
  registrationNumber: z.string().min(1, "Required").max(20),
  vehicleType: z.number().int().min(0).max(VEHICLE_TYPES.length - 1),
  make: z.string().min(1, "Required").max(50),
  model: z.string().min(1, "Required").max(50),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  colour: z.number().int().min(0).max(VEHICLE_COLOURS.length - 1),
  sellerName: z.string().min(1, "Required").max(100),
  pricePerDay: z.number().positive("Must be greater than 0"),
});
