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
import { getVehicleByRegistrationNumber, updateVehicle } from "@/services/vehicle-service";
import { VEHICLE_COLOURS, VEHICLE_TYPES, Vehicle } from "@/types/vehicle";

const schema = z.object({
  vehicleType: z.number().int().min(0).max(VEHICLE_TYPES.length - 1),
  make: z.string().min(1, "Required").max(50),
  model: z.string().min(1, "Required").max(50),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  colour: z.number().int().min(0).max(VEHICLE_COLOURS.length - 1),
  sellerName: z.string().min(1, "Required").max(100),
  pricePerDay: z.number().positive("Must be greater than 0"),
});

type FormValues = z.infer<typeof schema>;

export default function EditVehiclePage() {
  const router = useRouter();
  const { registrationNumber } = useParams<{ registrationNumber: string }>();

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({ resolver: zodResolver(schema) });

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
      .catch(() => setError("Vehicle not found."))
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
    } catch {
      toast.error("Failed to update vehicle.");
    }
  }

  if (isLoading) {
    return <p className="p-6 text-sm text-muted-foreground">Loading...</p>;
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
                {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
