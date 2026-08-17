import { httpClient } from "@/lib/http-client";
import { CreateVehicleRequest } from "@/types/create-vehicle-request";
import { Vehicle } from "@/types/vehicle";

export function createVehicle(request: CreateVehicleRequest) {
  return httpClient.post<Vehicle>("/api/vehicles", request);
}
