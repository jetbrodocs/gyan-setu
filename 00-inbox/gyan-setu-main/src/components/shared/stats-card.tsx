import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  iconColor?: string;
  iconBg?: string;
}

export function StatsCard({
  icon: Icon,
  value,
  label,
  iconColor = "text-blue-500",
  iconBg = "bg-blue-100",
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 flex items-center gap-4 shadow-sm">
      <div
        className={cn(
          "h-12 w-12 rounded-full flex items-center justify-center",
          iconBg
        )}
      >
        <Icon className={cn("h-5 w-5", iconColor)} />
      </div>
      <div>
        <div className="text-2xl font-bold text-navy">
          {typeof value === "number" ? value.toLocaleString() : value}
        </div>
        <div className="text-xs text-slate-500">{label}</div>
      </div>
    </div>
  );
}
