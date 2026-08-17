import { httpClient } from "@/lib/http-client";

export function softDeleteVehicle(id: string) {
  return httpClient.delete<void>(`/api/vehicles/${id}`);
}
