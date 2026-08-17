export type CreateVehicleRequest = {
  registrationNumber: string;
  vehicleType: number;
  make: string;
  model: string;
  year: number;
  colour: number;
  ownerName: string;
  pricePerDay: number;
  condition: number;
  imageUrls: string[];
};
