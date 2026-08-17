import { httpClient } from "@/lib/http-client";

export function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return httpClient.post<{ url: string }>("/api/images", formData);
}
