import { API_KEY_STORAGE_KEY } from "@/constants/api-key-storage-key";

export function clearApiKey(): void {
  sessionStorage.removeItem(API_KEY_STORAGE_KEY);
}
