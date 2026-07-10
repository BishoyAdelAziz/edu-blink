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
export function ChatIcon({ size = "md", className }: IconProps) {
  return (
    <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    className={iconClass(size, className)}
    fill="currentColor"
  >
    <path
      d="M228,267 C226.896,267 226,267.896 226,269 C226,270.104 226.896,271 228,271 C229.104,271 230,270.104 230,269 C230,267.896 229.104,267 228,267 Z M220,281 C218.832,281 217.704,280.864 216.62,280.633 L211.912,283.463 L211.975,278.824 C208.366,276.654 206,273.066 206,269 C206,262.373 212.268,257 220,257 C227.732,257 234,262.373 234,269 C234,275.628 227.732,281 220,281 Z M220,255 C211.164,255 204,261.269 204,269 C204,273.419 206.345,277.354 210,279.919 L210,287 L217.009,282.747 C217.979,282.907 218.977,283 220,283 C228.836,283 236,276.732 236,269 C236,261.269 228.836,255 220,255 Z M212,267 C210.896,267 210,267.896 210,269 C210,270.104 210.896,271 212,271 C213.104,271 214,270.104 214,269 C214,267.896 213.104,267 212,267 Z M220,267 C218.896,267 218,267.896 218,269 C218,270.104 218.896,271 220,271 C221.104,271 222,270.104 222,269 C222,267.896 221.104,267 220,267 Z"
      transform="translate(-204 -255)"
    />
  </svg>
  );
}

export function FAQIcon({ size = "md", className }: IconProps) {
  return (
    <svg
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    className={iconClass(size, className)}
    fill="currentColor"
  >
    <path d="M512 277.333c-58.974 0-106.667 47.693-106.667 106.667 0 11.782-9.551 21.333-21.333 21.333s-21.333-9.551-21.333-21.333c0-82.538 66.795-149.333 149.333-149.333S661.333 301.463 661.333 384c0 75.294-55.586 137.489-128 147.823V640c0 11.78-9.553 21.333-21.333 21.333S490.667 651.78 490.667 640V512c0-11.78 9.553-21.333 21.333-21.333 58.974 0 106.667-47.693 106.667-106.667S570.974 277.333 512 277.333z" />

    <path d="M512 783.787c23.565 0 42.667-19.102 42.667-42.667S535.565 698.453 512 698.453s-42.667 19.102-42.667 42.667 19.102 42.667 42.667 42.667z" />

    <path d="M512 85.333C276.358 85.333 85.333 276.358 85.333 512c0 235.639 191.025 426.667 426.667 426.667 235.639 0 426.667-191.027 426.667-426.667C938.667 276.358 747.64 85.333 512 85.333zM128 512c0-212.077 171.923-384 384-384 212.079 0 384 171.923 384 384 0 212.079-171.921 384-384 384-212.077 0-384-171.921-384-384z" />
  </svg>
  );
}
export function LeaderBoardIcon({ size = "md", className }: IconProps) {
  return (
<svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
    >
      <path
        d="M15 21H9V12.6C9 12.2686 9.26863 12 9.6 12H14.4C14.7314 12 15 12.2686 15 12.6V21Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M20.4 21H15V18.1C15 17.7686 15.2686 17.5 15.6 17.5H20.4C20.7314 17.5 21 17.7686 21 18.1V20.4C21 20.7314 20.7314 21 20.4 21Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M9 21V16.1C9 15.7686 8.73137 15.5 8.4 15.5H3.6C3.26863 15.5 3 15.7686 3 16.1V20.4C3 20.7314 3.26863 21 3.6 21H9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M10.8056 5.11325L11.7147 3.1856C11.8314 2.93813 12.1686 2.93813 12.2853 3.1856L13.1944 5.11325L15.2275 5.42427C15.4884 5.46418 15.5923 5.79977 15.4035 5.99229L13.9326 7.4917L14.2797 9.60999C14.3243 9.88202 14.0515 10.0895 13.8181 9.96099L12 8.96031L10.1819 9.96099C9.94851 10.0895 9.67568 9.88202 9.72026 9.60999L10.0674 7.4917L8.59651 5.99229C8.40766 5.79977 8.51163 5.46418 8.77248 5.42427L10.8056 5.11325Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export function ArrowDownIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={iconClass("sm", className)}
    >
      <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z" />
    </svg>
  );
}

export function ProgressPin({ className }: IconProps) {
  return (
    <div className={`flex flex-col items-center ${className ?? ""}`.trim()}>
      <div className="flex size-10 items-center justify-center rounded-full border border-gray-300 bg-white">
        <span className="text-sm font-bold text-[#1a3a6b]">You</span>
      </div>
      <span
        className="block h-0 w-0 border-x-[7px] border-x-transparent border-t-8 border-t-gray-300"
        aria-hidden
      />
    </div>
  );
}
export function DocumentIcon({
  size = 24,
  className = "",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9 12H15"
        stroke="currentColor"
        strokeWidth="0.672"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 15H15"
        stroke="currentColor"
        strokeWidth="0.672"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.8284 6.82843C18.4065 7.40649 18.6955 7.69552 18.8478 8.06306C19 8.4306 19 8.83935 19 9.65685V17C19 18.8856 19 19.8284 18.4142 20.4142C17.8284 21 16.8856 21 15 21H9C7.11438 21 6.17157 21 5.58579 20.4142C5 19.8284 5 18.8856 5 17V7C5 5.11438 5 4.17157 5.58579 3.58579C6.17157 3 7.11438 3 9 3H12.3431C13.1606 3 13.5694 3 13.9369 3.15224C14.3045 3.30448 14.5935 3.59351 15.1716 4.17157L17.8284 6.82843Z"
        stroke="currentColor"
        strokeWidth="0.672"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function LockIcon({
  size = 24,
  className = "",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16 10V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V10M12 14V17M18 15C18 18.3137 15.3137 21 12 21C8.68629 21 6 18.3137 6 15C6 11.6863 8.68629 9 12 9C15.3137 9 18 11.6863 18 15ZM13 14C13 14.5523 12.5523 15 12 15C11.4477 15 11 14.5523 11 14C11 13.4477 11.4477 13 12 13C12.5523 13 13 13.4477 13 14Z"
        stroke="currentColor"
        strokeWidth="0.456"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function ClockIcon({
  size = 24,
  className = "",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 7V12H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke="currentColor"
        strokeWidth="0.864"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function BooksIcon({
  size = 24,
  className = "",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M30.156 26.492L23.945 3.308C23.618 2.125 22.552 1.271 21.286 1.271C21.034 1.271 20.791 1.305 20.559 1.368L17.662 2.144C17.337 2.238 17.053 2.38 16.802 2.564C16.312 1.777 15.453 1.261 14.472 1.258H11.474C10.685 1.259 9.974 1.595 9.476 2.131C8.976 1.594 8.265 1.258 7.476 1.257H4.476C2.958 1.259 1.728 2.489 1.726 4.007V28.007C1.728 29.525 2.958 30.755 4.476 30.757H7.476C8.265 30.755 8.976 30.42 9.474 29.884C9.974 30.422 10.685 30.757 11.474 30.759H14.472C15.99 30.757 17.22 29.527 17.222 28.009V11.161L21.921 28.701C22.248 29.883 23.313 30.736 24.577 30.738H24.582C24.833 30.738 25.076 30.704 25.307 30.64L28.205 29.865C29.387 29.539 30.241 28.473 30.241 27.208C30.241 26.956 30.207 26.711 30.143 26.479L30.156 26.492ZM18.415 9.708L23.725 8.285L27.478 22.292L22.167 23.714L18.415 9.708ZM18.068 3.59L20.964 2.814C21.061 2.787 21.173 2.771 21.289 2.771C21.864 2.771 22.348 3.16 22.493 3.689L23.336 6.837L18.025 8.26L17.247 5.355V4.3C17.4 3.953 17.696 3.693 18.059 3.592L18.068 3.59ZM11.5 2.75H14.498C15.188 2.751 15.747 3.31 15.748 4V7.249H10.25V4C10.251 3.31 10.81 2.751 11.5 2.75ZM8.75 23.25H3.25V8.75H8.75V23.25ZM10.25 8.75H15.748V23.251H10.25V8.75ZM4.5 2.75H7.5C8.19 2.751 8.749 3.31 8.75 4V7.249H3.25V4C3.251 3.31 3.81 2.751 4.5 2.75ZM7.5 29.25H4.5C3.81 29.249 3.251 28.69 3.25 28V24.75H8.75V28C8.749 28.69 8.19 29.249 7.5 29.25ZM14.498 29.25H11.5C10.81 29.249 10.251 28.69 10.25 28V24.75H15.748V28C15.747 28.69 15.188 29.249 14.498 29.25ZM28.58 27.826C28.416 28.111 28.15 28.321 27.833 28.408L24.935 29.183C24.839 29.209 24.729 29.224 24.616 29.224C24.041 29.224 23.556 28.837 23.408 28.309L22.567 25.169L27.878 23.747L28.719 26.887C28.746 26.983 28.761 27.094 28.761 27.208C28.761 27.438 28.698 27.654 28.588 27.838L28.58 27.826Z"
        fill="currentColor"
      />
    </svg>
  );
}
export function StudentsIcon({
  size = 24,
  className = "",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-63 65 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1 102.1C10.7 102.1 18.5 94.2 18.5 84.5S10.7 66.9 1 66.9-16.6 74.7-16.6 84.5C-16.6 94.2-8.7 102.1 1 102.1ZM18 106.3C26 106.6 29.4 113 29.4 113L55.3 148.6C56.4 150.2 57 152.1 57 154.2C57 159.7 52.5 164.2 47 164.2C45.7 164.2 44.5 163.9 43.3 163.5L27.7 159.1V174.7H-26.5V159.1L-42.1 163.5C-43.2 163.9-44.4 164.2-45.8 164.2C-51.3 164.2-55.8 159.7-55.8 154.2C-55.8 152.1-55.2 150.2-54.1 148.6L-28.2 113C-28.2 113-24.8 106.6-16.8 106.3H18ZM0.6 163.8L20.9 157.1L20.4 157C6.4 152.9 11.8 134.4 25.8 138.5L27.7 139.2V118.3L0.6 127.2L-26.6 118.3V139.2L-24.7 138.5C-10.7 134.4-5.3 152.8-19.3 157L-19.8 157.1L0.6 163.8ZM56.4 188.6C57.8 188.6 58.9 187.2 58.9 185.3C58.9 183.4 57.8 182 56.4 182H-53.2C-54.6 182-55.7 183.5-55.7 185.3C-55.7 187.1-54.6 188.6-53.2 188.6H56.4Z"
        fill="currentColor"
      />
    </svg>
  );
}
export function LanguagesIcon({
  size = 24,
  className = "",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="0.648"
      />

      <path
        d="M12 22C14.6667 19.5758 16 16.2424 16 12C16 7.75758 14.6667 4.42424 12 2C9.33333 4.42424 8 7.75758 8 12C8 16.2424 9.33333 19.5758 12 22Z"
        stroke="currentColor"
        strokeWidth="0.648"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M2.5 9H21.5M2.5 15H21.5"
        stroke="currentColor"
        strokeWidth="0.648"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowIcon({
  size = 24,
  className = "",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 12H20M20 12L16 8M20 12L16 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlusIcon({ size = "md", className }: IconProps) {
  return (
    <svg
      className={iconClass(size, className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 5V19M5 12H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MinusIcon({ size = "md", className }: IconProps) {
  return (
    <svg
      className={iconClass(size, className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5 12H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}