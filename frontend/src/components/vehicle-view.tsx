import { TableImage } from "@/components/table-image";
import { DetailRow } from "@/components/detail-row";
import { ConditionBadge } from "@/components/condition-badge";
import { VEHICLE_COLOURS } from "@/constants/vehicle-colours";
import { VEHICLE_TYPES } from "@/constants/vehicle-types";
import { Vehicle } from "@/types/vehicle";

export function VehicleView({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="flex flex-col gap-4">
      <TableImage
        src={vehicle.imageUrls[0]}
        alt={vehicle.registrationNumber}
        className="mx-auto aspect-4/3 w-full max-w-sm rounded-lg"
      />

      <div className="grid grid-cols-1 gap-x-6 divide-y sm:grid-cols-2 sm:divide-y-0">
        <DetailRow label="Registration Number" value={vehicle.registrationNumber} />
        <DetailRow label="Type" value={VEHICLE_TYPES[vehicle.vehicleType]} />
        <DetailRow label="Make" value={vehicle.make} />
        <DetailRow label="Model" value={vehicle.model} />
        <DetailRow label="Year" value={String(vehicle.year)} />
        <DetailRow label="Colour" value={VEHICLE_COLOURS[vehicle.colour]} />
        <DetailRow label="Owner" value={vehicle.ownerName} />
        <DetailRow label="Price Per Day" value={`R${vehicle.pricePerDay.toFixed(2)}`} />
        <ConditionBadge condition={vehicle.condition} />
        <DetailRow label="Added" value={new Date(vehicle.createdDate).toLocaleDateString()} />
      </div>
    </div>
  );
}
