import { TableImage } from "@/components/table-image";
import { VEHICLE_COLOURS } from "@/constants/vehicle-colours";
import { VEHICLE_TYPES } from "@/constants/vehicle-types";
import { Vehicle } from "@/types/vehicle";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-1.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export function VehicleView({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="flex flex-col gap-4">
      <TableImage
        src={vehicle.imageUrls[0]}
        alt={vehicle.registrationNumber}
        className="h-64 w-full rounded-lg"
      />

      <div className="flex flex-col divide-y">
        <DetailRow label="Registration Number" value={vehicle.registrationNumber} />
        <DetailRow label="Type" value={VEHICLE_TYPES[vehicle.vehicleType]} />
        <DetailRow label="Make" value={vehicle.make} />
        <DetailRow label="Model" value={vehicle.model} />
        <DetailRow label="Year" value={String(vehicle.year)} />
        <DetailRow label="Colour" value={VEHICLE_COLOURS[vehicle.colour]} />
        <DetailRow label="Seller" value={vehicle.sellerName} />
        <DetailRow label="Price Per Day" value={`R${vehicle.pricePerDay.toFixed(2)}`} />
        {vehicle.hireStartDate && (
          <DetailRow label="Hire Start" value={new Date(vehicle.hireStartDate).toLocaleDateString()} />
        )}
        {vehicle.hireEndDate && (
          <DetailRow label="Hire End" value={new Date(vehicle.hireEndDate).toLocaleDateString()} />
        )}
        <DetailRow label="Added" value={new Date(vehicle.createdDate).toLocaleDateString()} />
      </div>
    </div>
  );
}
