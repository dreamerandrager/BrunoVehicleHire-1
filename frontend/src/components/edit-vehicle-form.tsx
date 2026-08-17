"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { TextFormField } from "@/components/text-form-field";
import { SelectFormField } from "@/components/select-form-field";
import { LoadingSpinner } from "@/components/loading-spinner";
import { getErrorMessage } from "@/lib/get-error-message";
import { updateVehicle } from "@/services/vehicle-service";
import { updateVehicleSchema } from "@/schemas/update-vehicle-schema";
import { VEHICLE_COLOURS } from "@/constants/vehicle-colours";
import { VEHICLE_TYPES } from "@/constants/vehicle-types";
import { Vehicle } from "@/types/vehicle";

type FormValues = z.infer<typeof updateVehicleSchema>;

export function EditVehicleForm({ vehicle, onSuccess }: { vehicle: Vehicle; onSuccess: () => void }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(updateVehicleSchema),
    defaultValues: {
      vehicleType: vehicle.vehicleType,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      colour: vehicle.colour,
      sellerName: vehicle.sellerName,
      pricePerDay: vehicle.pricePerDay,
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      await updateVehicle(vehicle.id, {
        ...values,
        hireStartDate: vehicle.hireStartDate,
        hireEndDate: vehicle.hireEndDate,
      });
      toast.success("Vehicle updated.");
      onSuccess();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to update vehicle."));
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <SelectFormField name="vehicleType" control={form.control} label="Vehicle Type" options={VEHICLE_TYPES} />
        <TextFormField name="make" control={form.control} label="Make" />
        <TextFormField name="model" control={form.control} label="Model" />
        <TextFormField name="year" control={form.control} label="Year" type="number" />
        <SelectFormField name="colour" control={form.control} label="Colour" options={VEHICLE_COLOURS} />
        <TextFormField name="sellerName" control={form.control} label="Seller Name" />
        <TextFormField name="pricePerDay" control={form.control} label="Price Per Day" type="number" step="0.01" />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <LoadingSpinner />}
          {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </FieldGroup>
    </form>
  );
}
