import { VehicleType } from "@/types/vehicle-type";
import { VehicleColour } from "@/types/vehicle-colour";

export type UpdateVehicleRequest = {
  vehicleType: VehicleType;
  make: string;
  model: string;
  year: number;
  colour: VehicleColour;
  sellerName: string;
  pricePerDay: number;
  hireStartDate: string | null;
  hireEndDate: string | null;
};
