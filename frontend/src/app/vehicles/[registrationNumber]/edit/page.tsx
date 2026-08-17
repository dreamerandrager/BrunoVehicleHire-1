"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextFormField } from "@/components/text-form-field";
import { SelectFormField } from "@/components/select-form-field";
import { LoadingSpinner } from "@/components/loading-spinner";
import { getErrorMessage } from "@/lib/get-error-message";
import { getVehicleByRegistrationNumber, updateVehicle } from "@/services/vehicle-service";
import { updateVehicleSchema } from "@/schemas/update-vehicle-schema";
import { VEHICLE_COLOURS } from "@/constants/vehicle-colours";
import { VEHICLE_TYPES } from "@/constants/vehicle-types";
import { Vehicle } from "@/types/vehicle";

type FormValues = z.infer<typeof updateVehicleSchema>;

export default function EditVehiclePage() {
  const router = useRouter();
  const { registrationNumber } = useParams<{ registrationNumber: string }>();

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({ resolver: zodResolver(updateVehicleSchema) });

  useEffect(() => {
    getVehicleByRegistrationNumber(registrationNumber)
      .then((data) => {
        setVehicle(data);
        form.reset({
          vehicleType: data.vehicleType,
          make: data.make,
          model: data.model,
          year: data.year,
          colour: data.colour,
          sellerName: data.sellerName,
          pricePerDay: data.pricePerDay,
        });
      })
      .catch((error) => setError(getErrorMessage(error, "Vehicle not found.")))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registrationNumber]);

  async function onSubmit(values: FormValues) {
    if (!vehicle) return;

    try {
      await updateVehicle(vehicle.id, {
        ...values,
        hireStartDate: vehicle.hireStartDate,
        hireEndDate: vehicle.hireEndDate,
      });
      toast.success("Vehicle updated.");
      router.push("/");
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to update vehicle."));
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center p-6">
        <LoadingSpinner className="size-6 text-muted-foreground" />
      </div>
    );
  }

  if (error || !vehicle) {
    return <p className="p-6 text-sm text-destructive">{error ?? "Vehicle not found."}</p>;
  }

  return (
    <div className="mx-auto w-full max-w-md p-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Vehicle — {vehicle.registrationNumber}</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
}
