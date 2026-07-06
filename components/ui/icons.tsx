export type IconSize = "sm" | "md" | "lg" | "xl";

export type IconProps = {
  size?: IconSize;
  className?: string;
};

const ICON_SIZES: Record<IconSize, string> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
  xl: "size-8",
};

function iconClass(size: IconSize = "md", className?: string) {
  return className ?? ICON_SIZES[size];
}

export function ExpandIcon({ size = "lg", className }: IconProps) {
  return (
    <svg
      className={iconClass(size, className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 7C23 5.34315 21.6569 4 20 4H4C2.34315 4 1 5.34315 1 7V17C1 18.6569 2.34315 20 4 20H20C21.6569 20 23 18.6569 23 17V7ZM21 7C21 6.44772 20.5523 6 20 6H4C3.44772 6 3 6.44771 3 7V17C3 17.5523 3.44772 18 4 18H20C20.5523 18 21 17.5523 21 17V7Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PlayIcon({ size = "md", className }: IconProps) {
  return (
    <svg className={iconClass(size, className)} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export function PauseIcon({ size = "md", className }: IconProps) {
  return (
    <svg className={iconClass(size, className)} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
    </svg>
  );
}

export function VolumeIcon({ size = "md", className }: IconProps) {
  return (
    <svg className={iconClass(size, className)} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  );
}

export function MutedIcon({ size = "md", className }: IconProps) {
  return (
    <svg className={iconClass(size, className)} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
    </svg>
  );
}

type TheaterIconProps = IconProps & {
  active?: boolean;
};

export function TheaterIcon({ size = "md", className, active }: TheaterIconProps) {
  return (
    <svg className={iconClass(size, className)} viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M3 5h18v2H3V5zm0 12h18v2H3v-2zm0-6h18v2H3v-2z"
        opacity={active ? 1 : 0.7}
      />
    </svg>
  );
}

export function FullscreenIcon({ size = "md", className }: IconProps) {
  return (
    <svg className={iconClass(size, className)} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
    </svg>
  );
}

export function ExitFullscreenIcon({ size = "md", className }: IconProps) {
  return (
    <svg className={iconClass(size, className)} viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
    </svg>
  );
}

export function CurriculumIcon({ size = "md", className }: IconProps) {
  return (
    <svg
      className={iconClass(size, className)}
      viewBox="0 0 846.66 846.66"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M131.3 9.1h418.37c102.57 0 186.4 83.84 186.4 186.4v621.35c0 11.43-9.27 20.71-20.71 20.71H131.3c-11.44 0-20.71-9.28-20.71-20.71V29.81c0-11.43 9.27-20.71 20.71-20.71m121.68 386.18c-27.24 0-27.24-41.42 0-41.42h121.16c27.24 0 27.24 41.42 0 41.42zm0 212.29c-27.24 0-27.24-41.42 0-41.42h121.16c27.24 0 27.24 41.42 0 41.42zm219.54 0c-27.24 0-27.24-41.42 0-41.42h121.16c27.24 0 27.24 41.42 0 41.42zm0 81.81c-27.24 0-27.24-41.42 0-41.42h121.16c27.24 0 27.24 41.42 0 41.42zm-219.54 0c-27.24 0-27.24-41.42 0-41.42h121.16c27.24 0 27.24 41.42 0 41.42zm219.54-294.1c-27.24 0-27.24-41.42 0-41.42h121.16c27.24 0 27.24 41.42 0 41.42zm0 81.81c-27.24 0-27.24-41.42 0-41.42h121.16c27.24 0 27.24 41.42 0 41.42zm-219.54 0c-27.24 0-27.24-41.42 0-41.42h121.16c27.24 0 27.24 41.42 0 41.42zm85.43-356.23h169.84c47.89 0 86.99 39.1 86.99 86.98 0 47.89-39.1 86.99-86.99 86.99H338.41c-47.89 0-86.99-39.1-86.99-86.99 0-47.88 39.1-86.98 86.99-86.98m169.84 41.42H338.41c-25.02 0-45.56 20.55-45.56 45.56 0 25.02 20.54 45.57 45.56 45.57h169.84c25.02 0 45.56-20.55 45.56-45.57 0-25.01-20.54-45.56-45.56-45.56m41.42-111.76H152.01v745.62h542.64V195.5c0-79.69-65.28-144.98-144.98-144.98" />
    </svg>
  );
}
