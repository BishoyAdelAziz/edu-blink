import { ProgressPin } from "./icons";

type ProgressBarProps = {
  value: number;
  className?: string;
};

export function ProgressBar({ value, className = "" }: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, value));

  return (
    <div className={`relative w-full ${className}`.trim()}>
      <div className="relative h-14">
        <div
          className="pointer-events-none absolute bottom-3 z-10 -translate-x-1/2 transition-[left] duration-700"
          style={{ left: `${percent}%` }}
          aria-hidden
        >
          <ProgressPin />
        </div>
      </div>

      <div className="relative h-1 w-full overflow-hidden rounded-full bg-gray-300">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-green-500 transition-[width] duration-700"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="relative mt-2 h-5">
        <span
          className="absolute -translate-x-1/2 text-sm font-bold text-[#1a3a6b] transition-[left] duration-700"
          style={{ left: `${percent}%` }}
        >
          {Math.round(percent)}%
        </span>
      </div>
    </div>
  );
}
