import { httpClient } from "@/lib/http-client";
import { UpdateVehicleRequest } from "@/types/update-vehicle-request";
import { Vehicle } from "@/types/vehicle";

export function updateVehicle(id: string, request: UpdateVehicleRequest) {
  return httpClient.put<Vehicle>(`/api/vehicles/${id}`, request);
}
