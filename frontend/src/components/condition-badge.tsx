import { ConditionPill } from "@/components/condition-pill";

export function ConditionBadge({ condition }: { condition: number }) {
  return (
    <div className="flex justify-between gap-4 py-1.5 text-sm">
      <span className="text-muted-foreground">Condition</span>
      <ConditionPill condition={condition} />
    </div>
  );
}
