import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { ApiError } from "@/lib/api-error";

export function applyFieldErrors<T extends FieldValues>(error: unknown, setError: UseFormSetError<T>): boolean {
  if (!(error instanceof ApiError) || !error.fieldErrors) {
    return false;
  }

  const entries = Object.entries(error.fieldErrors);
  if (entries.length === 0) {
    return false;
  }

  for (const [field, messages] of entries) {
    const fieldName = (field.charAt(0).toLowerCase() + field.slice(1)) as Path<T>;
    setError(fieldName, { type: "server", message: messages[0] });
  }

  return true;
}
