"use client";

import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { TextFormField } from "@/components/text-form-field";
import { SelectFormField } from "@/components/select-form-field";
import { LoadingSpinner } from "@/components/loading-spinner";
import { TableImage } from "@/components/table-image";
import { getErrorMessage } from "@/lib/get-error-message";
import { updateVehicle } from "@/services/vehicle-service";
import { uploadImage } from "@/services/image-service";
import { updateVehicleSchema } from "@/schemas/update-vehicle-schema";
import { VEHICLE_COLOURS } from "@/constants/vehicle-colours";
import { VEHICLE_TYPES } from "@/constants/vehicle-types";
import { Vehicle } from "@/types/vehicle";

type FormValues = z.infer<typeof updateVehicleSchema>;

export function EditVehicleForm({ vehicle, onSuccess }: { vehicle: Vehicle; onSuccess: () => void }) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(vehicle.imageUrls[0]);
  const [imageUploading, setImageUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(updateVehicleSchema),
    defaultValues: {
      vehicleType: vehicle.vehicleType,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      colour: vehicle.colour,
      ownerName: vehicle.ownerName,
      pricePerDay: vehicle.pricePerDay,
    },
  });

  async function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
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
      await updateVehicle(vehicle.id, {
        ...values,
        condition: vehicle.condition, // no condition input control yet - preserve existing value on update
        imageUrls: imageUrl ? [imageUrl] : [],
      });
      toast.success("Vehicle updated.");
      onSuccess();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to update vehicle."));
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="group relative mx-auto aspect-4/3 w-full max-w-sm">
        <TableImage key={imageUrl} src={imageUrl} alt={vehicle.registrationNumber} className="size-full rounded-lg" />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute inset-0 flex items-center justify-center gap-2 rounded-lg bg-black/0 text-transparent transition-colors group-hover:bg-black/50 group-hover:text-white"
        >
          {imageUploading ? <LoadingSpinner /> : <PencilIcon className="size-4" />}
          {imageUploading ? "Uploading..." : "Change Image"}
        </button>

        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
      </div>

      <FieldGroup>
        <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
          <SelectFormField name="vehicleType" control={form.control} label="Vehicle Type" options={VEHICLE_TYPES} />
          <TextFormField name="make" control={form.control} label="Make" />
          <TextFormField name="model" control={form.control} label="Model" />
          <TextFormField name="year" control={form.control} label="Year" type="number" />
          <SelectFormField name="colour" control={form.control} label="Colour" options={VEHICLE_COLOURS} />
          <TextFormField name="ownerName" control={form.control} label="Owner Name" />
          <TextFormField name="pricePerDay" control={form.control} label="Price Per Day" type="number" step="0.01" />
        </div>

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <LoadingSpinner />}
          {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </FieldGroup>
    </form>
  );
}
