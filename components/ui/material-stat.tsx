import type { ReactNode } from "react";

export type MaterialStatProps = {
  icon: ReactNode;
  label: string;
  value: ReactNode;
};

export function MaterialStat({ icon, label, value }: MaterialStatProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="inline-flex items-center justify-center gap-2">
        {icon}
        {label}
      </div>
      <p>{value}</p>
    </div>
  );
}

export type MaterialStatsGridProps = {
  items: MaterialStatProps[];
  className?: string;
};

function MaterialStatColumn({ items }: { items: MaterialStatProps[] }) {
  return (
    <div className="flex flex-col divide-y-2 divide-gray-200">
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} className="py-4 first:pt-0 last:pb-0">
          <MaterialStat {...item} />
        </div>
      ))}
    </div>
  );
}

export function MaterialStatsGrid({ items, className = "" }: MaterialStatsGridProps) {
  const midpoint = Math.ceil(items.length / 2);
  const leftColumn = items.slice(0, midpoint);
  const rightColumn = items.slice(midpoint);

  return (
    <div className={`w-full ${className}`.trim()}>
      <div className="flex flex-col divide-y-2 divide-gray-200 md:hidden">
        {items.map((item, index) => (
          <div key={`${item.label}-${index}`} className="py-4 first:pt-0 last:pb-0">
            <MaterialStat {...item} />
          </div>
        ))}
      </div>

      <div className="hidden gap-x-7 md:grid md:grid-cols-2">
        <MaterialStatColumn items={leftColumn} />
        <MaterialStatColumn items={rightColumn} />
      </div>
    </div>
  );
}
