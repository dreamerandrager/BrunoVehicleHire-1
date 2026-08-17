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
import { createVehicle } from "@/services/vehicles/create-vehicle";
import { uploadVehicleImage } from "@/services/vehicles/upload-vehicle-image";
import { createVehicleSchema } from "@/schemas/create-vehicle-schema";
import { VEHICLE_COLOURS } from "@/constants/vehicle-colours";
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
      sellerName: "",
      pricePerDay: 0,
    },
  });

  async function handleImageSelect(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const { url } = await uploadVehicleImage(file);
      setImageUrl(url);
    } catch {
      toast.error("Image upload failed.");
    } finally {
      setImageUploading(false);
    }
  }

  async function onSubmit(values: FormValues) {
    try {
      await createVehicle({
        ...values,
        hireStartDate: null,
        hireEndDate: null,
        imageUrls: imageUrl ? [imageUrl] : [],
      });
      toast.success("Vehicle created.");
      router.push("/");
    } catch {
      toast.error("Failed to create vehicle.");
    }
  }

  return (
    <div className="mx-auto w-full max-w-md p-6">
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
              <TextFormField name="sellerName" control={form.control} label="Seller Name" />
              <TextFormField name="pricePerDay" control={form.control} label="Price Per Day" type="number" step="0.01" />

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
