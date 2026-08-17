import { httpClient } from "@/lib/http-client";
import { PagedResult } from "@/types/paged-result";
import { Vehicle } from "@/types/vehicle";
import { CreateVehicleRequest } from "@/types/create-vehicle-request";
import { UpdateVehicleRequest } from "@/types/update-vehicle-request";
import { DEFAULT_PAGE_SIZE } from "@/constants/default-page-size";

export function getVehiclesPaged(pageNumber: number, pageSize: number = DEFAULT_PAGE_SIZE) {
  return httpClient.get<PagedResult<Vehicle>>(`/api/vehicles?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}

export function getVehicleByRegistrationNumber(registrationNumber: string) {
  return httpClient.get<Vehicle>(`/api/vehicles/${encodeURIComponent(registrationNumber)}`);
}

export function createVehicle(request: CreateVehicleRequest) {
  return httpClient.post<Vehicle>("/api/vehicles", request);
}

export function updateVehicle(id: string, request: UpdateVehicleRequest) {
  return httpClient.put<Vehicle>(`/api/vehicles/${id}`, request);
}

export function softDeleteVehicle(id: string) {
  return httpClient.delete<void>(`/api/vehicles/${id}`);
}
