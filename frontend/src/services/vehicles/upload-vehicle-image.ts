import { httpClient } from "@/lib/http-client";

export function uploadVehicleImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return httpClient.postForm<{ url: string }>("/api/images", formData);
}
