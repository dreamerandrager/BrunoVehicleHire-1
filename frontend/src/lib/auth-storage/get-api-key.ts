import { API_KEY_STORAGE_KEY } from "@/constants/api-key-storage-key";

export function getApiKey(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(API_KEY_STORAGE_KEY);
}
