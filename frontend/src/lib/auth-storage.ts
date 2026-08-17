const STORAGE_KEY = "bruno-api-key";

export function getApiKey(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(STORAGE_KEY);
}

export function setApiKey(apiKey: string): void {
  sessionStorage.setItem(STORAGE_KEY, apiKey);
}

export function clearApiKey(): void {
  sessionStorage.removeItem(STORAGE_KEY);
}
