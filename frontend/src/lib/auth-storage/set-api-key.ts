import { API_KEY_STORAGE_KEY } from "@/constants/api-key-storage-key";

export function setApiKey(apiKey: string): void {
  sessionStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
}
