import { httpClient } from "@/lib/http-client";
import { Vehicle } from "@/types/vehicle";

export function getVehicleByRegistrationNumber(registrationNumber: string) {
  return httpClient.get<Vehicle>(`/api/vehicles/${encodeURIComponent(registrationNumber)}`);
}
