"use client";

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

type TextFormFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
  step?: string;
};

export function TextFormField<T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  step,
}: TextFormFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Input
            id={field.name}
            name={field.name}
            type={type}
            step={step}
            value={type === "number" && Number.isNaN(field.value) ? "" : field.value}
            onChange={(e) => field.onChange(type === "number" ? e.target.valueAsNumber : e.target.value)}
            onBlur={field.onBlur}
            ref={field.ref}
            aria-invalid={fieldState.invalid}
          />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
