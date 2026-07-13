"use client";

import { Checkbox } from "@/components/ui/checkbox";

export interface FilterGroup {
  label: string;
  key: string;
  options: { value: string; label: string; count?: number }[];
}

interface FilterSidebarProps {
  groups: FilterGroup[];
  selected: Record<string, string[]>;
  onFilterChange: (key: string, values: string[]) => void;
  onReset: () => void;
}

export function FilterSidebar({
  groups,
  selected,
  onFilterChange,
  onReset,
}: FilterSidebarProps) {
  const hasAnySelected = Object.values(selected).some((v) => v.length > 0);

  return (
    <aside className="w-[220px] shrink-0 pr-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-navy">Filters</h2>
        {hasAnySelected && (
          <button
            onClick={onReset}
            className="text-xs text-blue-500 hover:text-blue-700 font-medium"
          >
            Reset All
          </button>
        )}
      </div>

      {/* Filter groups */}
      <div className="space-y-5">
        {groups.map((group) => (
          <div key={group.key}>
            <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              {group.label}
            </h3>
            <div className="space-y-2">
              {group.options.map((option) => {
                const isChecked = (selected[group.key] || []).includes(
                  option.value
                );
                const toggle = () => {
                  const current = selected[group.key] || [];
                  const next = isChecked
                    ? current.filter((v) => v !== option.value)
                    : [...current, option.value];
                  onFilterChange(group.key, next);
                };
                return (
                  <div
                    key={option.value}
                    role="button"
                    tabIndex={0}
                    onClick={toggle}
                    onKeyDown={(e) => {
                      if (e.key === " " || e.key === "Enter") {
                        e.preventDefault();
                        toggle();
                      }
                    }}
                    className="flex items-center gap-2 cursor-pointer group/item"
                  >
                    <Checkbox
                      checked={isChecked}
                      tabIndex={-1}
                      className="h-4 w-4 rounded-sm border-slate-300 data-[state=checked]:bg-navy data-[state=checked]:border-navy pointer-events-none"
                    />
                    <span className="text-sm text-slate-700 group-hover/item:text-navy">
                      {option.label}
                    </span>
                    {option.count != null && (
                      <span className="text-xs text-slate-400 ml-auto">
                        {option.count}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
