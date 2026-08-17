import { httpClient } from "@/lib/http-client";
import {
  CreateVehicleRequest,
  PagedResult,
  UpdateVehicleRequest,
  Vehicle,
} from "@/types/vehicle";

export function getVehiclesPaged(pageNumber: number, pageSize: number) {
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

export function uploadVehicleImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return httpClient.postForm<{ url: string }>("/api/images", formData);
}
