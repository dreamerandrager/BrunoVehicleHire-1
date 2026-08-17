export const VEHICLE_TYPES = [
  "Car",
  "Suv",
  "Van",
  "Truck",
  "Bus",
  "Minibus",
  "Motorcycle",
  "Trailer",
  "Tractor",
  "Helicopter",
  "Boat",
  "Other",
] as const;

export const VEHICLE_COLOURS = [
  "White",
  "Black",
  "Silver",
  "Grey",
  "Blue",
  "Red",
  "Green",
  "Brown",
  "Yellow",
  "Orange",
] as const;

export type VehicleType = number;
export type VehicleColour = number;

export type Vehicle = {
  id: string;
  registrationNumber: string;
  vehicleType: VehicleType;
  make: string;
  model: string;
  year: number;
  colour: VehicleColour;
  sellerName: string;
  pricePerDay: number;
  hireStartDate: string | null;
  hireEndDate: string | null;
  imageUrls: string[];
  createdDate: string;
};

export type PagedResult<T> = {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type CreateVehicleRequest = {
  registrationNumber: string;
  vehicleType: VehicleType;
  make: string;
  model: string;
  year: number;
  colour: VehicleColour;
  sellerName: string;
  pricePerDay: number;
  hireStartDate: string | null;
  hireEndDate: string | null;
  imageUrls: string[];
};

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
