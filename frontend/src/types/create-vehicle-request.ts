export type CreateVehicleRequest = {
  registrationNumber: string;
  vehicleType: number;
  make: string;
  model: string;
  year: number;
  colour: number;
  ownerName: string;
  pricePerDay: number;
  hireStartDate: string | null;
  hireEndDate: string | null;
  imageUrls: string[];
};
