"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextFormField } from "@/components/text-form-field";
import { SelectFormField } from "@/components/select-form-field";
import { LoadingSpinner } from "@/components/loading-spinner";
import { BackButton } from "@/components/back-button";
import { getErrorMessage } from "@/lib/get-error-message";
import { createVehicle } from "@/services/vehicle-service";
import { uploadImage } from "@/services/image-service";
import { createVehicleSchema } from "@/schemas/create-vehicle-schema";
import { VEHICLE_COLOURS } from "@/constants/vehicle-colours";
import { VEHICLE_CONDITIONS } from "@/constants/vehicle-conditions";
import { VEHICLE_TYPES } from "@/constants/vehicle-types";

type FormValues = z.infer<typeof createVehicleSchema>;

export default function NewVehiclePage() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(createVehicleSchema),
    defaultValues: {
      registrationNumber: "",
      vehicleType: 0,
      make: "",
      model: "",
      year: new Date().getFullYear(),
      colour: 0,
      ownerName: "",
      pricePerDay: 0,
      condition: 0,
    },
  });

  async function handleImageSelect(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const { url } = await uploadImage(file);
      setImageUrl(url);
    } catch (error) {
      toast.error(getErrorMessage(error, "Image upload failed."));
    } finally {
      setImageUploading(false);
    }
  }

  async function onSubmit(values: FormValues) {
    try {
      await createVehicle({
        ...values,
        imageUrls: imageUrl ? [imageUrl] : [],
      });
      toast.success("Vehicle created.");
      router.push("/");
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to create vehicle."));
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4 p-6">
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle>Add Vehicle</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <TextFormField name="registrationNumber" control={form.control} label="Registration Number" />
              <SelectFormField name="vehicleType" control={form.control} label="Vehicle Type" options={VEHICLE_TYPES} />
              <TextFormField name="make" control={form.control} label="Make" />
              <TextFormField name="model" control={form.control} label="Model" />
              <TextFormField name="year" control={form.control} label="Year" type="number" />
              <SelectFormField name="colour" control={form.control} label="Colour" options={VEHICLE_COLOURS} />
              <TextFormField name="ownerName" control={form.control} label="Owner Name" />
              <TextFormField name="pricePerDay" control={form.control} label="Price Per Day (R)" type="number" step="0.01" />
              <SelectFormField name="condition" control={form.control} label="Condition" options={VEHICLE_CONDITIONS} />

              <Field>
                <FieldLabel htmlFor="image">Image</FieldLabel>
                <Input id="image" type="file" accept="image/*" onChange={handleImageSelect} />
                {imageUploading && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <LoadingSpinner /> Uploading...
                  </div>
                )}
                {imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imageUrl} alt="Vehicle" className="h-24 w-24 rounded object-cover" />
                )}
              </Field>

              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <LoadingSpinner />}
                {form.formState.isSubmitting ? "Creating..." : "Create Vehicle"}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
