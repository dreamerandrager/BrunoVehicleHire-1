import { cn } from "@/lib/utils";
import { VEHICLE_CONDITIONS } from "@/constants/vehicle-conditions";
import { VEHICLE_CONDITION_STYLES } from "@/constants/vehicle-condition-styles";

export function ConditionPill({ condition }: { condition: number }) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-0.5 text-xs font-medium",
        VEHICLE_CONDITION_STYLES[condition]
      )}
    >
      {VEHICLE_CONDITIONS[condition]}
    </span>
  );
}
