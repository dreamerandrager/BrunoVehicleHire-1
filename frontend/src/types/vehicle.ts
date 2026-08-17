export type Vehicle = {
  id: string;
  registrationNumber: string;
  vehicleType: number;
  make: string;
  model: string;
  year: number;
  colour: number;
  sellerName: string;
  pricePerDay: number;
  hireStartDate: string | null;
  hireEndDate: string | null;
  imageUrls: string[];
  createdDate: string;
};
