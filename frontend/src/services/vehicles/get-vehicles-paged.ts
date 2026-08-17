import { httpClient } from "@/lib/http-client";
import { PagedResult } from "@/types/paged-result";
import { Vehicle } from "@/types/vehicle";
import { DEFAULT_PAGE_SIZE } from "@/constants/default-page-size";

export function getVehiclesPaged(pageNumber: number, pageSize: number = DEFAULT_PAGE_SIZE) {
  return httpClient.get<PagedResult<Vehicle>>(`/api/vehicles?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}
