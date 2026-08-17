import { getApiKey } from "@/services/auth-service";
import { ApiError } from "@/lib/api-error";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const apiKey = getApiKey();

  const headers: Record<string, string> = { ...(options.headers as Record<string, string>) };
  if (typeof options.body === "string") {
    headers["Content-Type"] = "application/json";
  }
  if (apiKey) {
    headers["X-Api-Key"] = apiKey;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  } catch {
    throw new ApiError(0, "Unable to reach the server. Please check your connection and try again.");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";
  const body = contentType.includes("json") ? await response.json() : undefined;

  if (!response.ok) {
    const message = body?.title ?? body?.error ?? `Request failed with status ${response.status}.`;
    throw new ApiError(response.status, message, body?.errors);
  }

  return body as T;
}

function serializeBody(data: unknown): BodyInit | undefined {
  if (data === undefined || data instanceof FormData) {
    return data;
  }
  return JSON.stringify(data);
}

export const httpClient = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, data?: unknown) => request<T>(path, { method: "POST", body: serializeBody(data) }),
  put: <T>(path: string, data?: unknown) => request<T>(path, { method: "PUT", body: serializeBody(data) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
