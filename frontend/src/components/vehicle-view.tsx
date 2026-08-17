import { TableImage } from "@/components/table-image";
import { cn } from "@/lib/utils";
import { VEHICLE_COLOURS } from "@/constants/vehicle-colours";
import { VEHICLE_CONDITIONS } from "@/constants/vehicle-conditions";
import { VEHICLE_CONDITION_STYLES } from "@/constants/vehicle-condition-styles";
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

function ConditionBadge({ condition }: { condition: number }) {
  return (
    <div className="flex justify-between gap-4 py-1.5 text-sm">
      <span className="text-muted-foreground">Condition</span>
      <span
        className={cn(
          "rounded-full px-2.5 py-0.5 text-xs font-medium",
          VEHICLE_CONDITION_STYLES[condition]
        )}
      >
        {VEHICLE_CONDITIONS[condition]}
      </span>
    </div>
  );
}

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
