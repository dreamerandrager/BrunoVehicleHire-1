"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LoadingSpinner } from "@/components/loading-spinner";
import { TableImage } from "@/components/table-image";
import { ConditionPill } from "@/components/condition-pill";
import { Modal } from "@/components/modal";
import { VehicleView } from "@/components/vehicle-view";
import { EditVehicleForm } from "@/components/edit-vehicle-form";
import { getErrorMessage } from "@/lib/get-error-message";
import { getVehiclesPaged, softDeleteVehicle } from "@/services/vehicle-service";
import { PagedResult } from "@/types/paged-result";
import { Vehicle } from "@/types/vehicle";
import { VEHICLE_COLOURS } from "@/constants/vehicle-colours";
import { VEHICLE_TYPES } from "@/constants/vehicle-types";

export default function HomePage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState<PagedResult<Vehicle> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [viewingVehicle, setViewingVehicle] = useState<Vehicle | null>(null);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const loadVehicles = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      setData(await getVehiclesPaged(pageNumber));
    } catch (error) {
      setError(getErrorMessage(error, "Failed to load vehicles."));
    } finally {
      setIsLoading(false);
    }
  }, [pageNumber]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch-on-mount/page-change, not derived state
    loadVehicles();
  }, [loadVehicles]);

  async function handleDelete(id: string) {
    try {
      await softDeleteVehicle(id);
      toast.success("Vehicle deleted.");
      loadVehicles();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to delete vehicle."));
    }
  }

  const totalPages = data ? Math.max(1, Math.ceil(data.totalCount / data.pageSize)) : 1;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Vehicles</h1>
        <Button render={<Link href="/vehicles/new" />} nativeButton={false}>Add Vehicle</Button>
      </div>

      {isLoading && (
        <div className="flex justify-center py-8">
          <LoadingSpinner className="size-6 text-muted-foreground" />
        </div>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}

      {!isLoading && !error && data && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Registration</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Make</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Colour</TableHead>
                <TableHead>Price/Day</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={10} className="text-center text-muted-foreground">
                    No vehicles found.
                  </TableCell>
                </TableRow>
              )}
              {data.items.map((vehicle) => (
                <TableRow
                  key={vehicle.id}
                  className="cursor-pointer"
                  onClick={() => setViewingVehicle(vehicle)}
                >
                  <TableCell>
                    <TableImage src={vehicle.imageUrls[0]} alt={vehicle.registrationNumber} />
                  </TableCell>
                  <TableCell>{vehicle.registrationNumber}</TableCell>
                  <TableCell>{VEHICLE_TYPES[vehicle.vehicleType]}</TableCell>
                  <TableCell>{vehicle.make}</TableCell>
                  <TableCell>{vehicle.model}</TableCell>
                  <TableCell>{vehicle.year}</TableCell>
                  <TableCell>{VEHICLE_COLOURS[vehicle.colour]}</TableCell>
                  <TableCell>R{vehicle.pricePerDay.toFixed(2)}</TableCell>
                  <TableCell>
                    <ConditionPill condition={vehicle.condition} />
                  </TableCell>
                  <TableCell className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                    <Button variant="outline" size="sm" onClick={() => setEditingVehicle(vehicle)}>
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger render={<Button variant="destructive" size="sm" />}>
                        Delete
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete this vehicle?</AlertDialogTitle>
                          <AlertDialogDescription>
                            {vehicle.registrationNumber} will be removed from the fleet listing. This can&apos;t be undone from here.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(vehicle.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="grid grid-cols-3 items-center">
            <p className="text-sm text-muted-foreground">
              Page {data.pageNumber} of {totalPages}
            </p>
            <p className="text-center text-sm text-muted-foreground">{data.totalCount} items</p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={pageNumber <= 1}
                onClick={() => setPageNumber((p) => p - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={pageNumber >= totalPages}
                onClick={() => setPageNumber((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}

      {viewingVehicle && (
        <Modal
          open
          onOpenChange={(open) => !open && setViewingVehicle(null)}
          title="Vehicle Details"
          className="sm:max-w-2xl"
        >
          <VehicleView vehicle={viewingVehicle} />
        </Modal>
      )}

      {editingVehicle && (
        <Modal
          open
          onOpenChange={(open) => !open && setEditingVehicle(null)}
          title="Edit Vehicle"
          className="sm:max-w-2xl"
        >
          <EditVehicleForm
            vehicle={editingVehicle}
            onSuccess={() => {
              setEditingVehicle(null);
              loadVehicles();
            }}
          />
        </Modal>
      )}
    </div>
  );
}
