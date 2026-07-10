import type { ComponentProps } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";
import Loader1 from "../loaders/Loader-1";

type ButtonSubmitType = Extract<ComponentProps<"button">["type"], "submit">;

interface SubmitButtonProps<TFieldValues extends FieldValues> {
  isLoading: boolean;
  text: string;
  disabled: boolean;
  type?: ButtonSubmitType;
  ariaLabel?: string;
  className?: string;
  errors?: FieldErrors<TFieldValues>;
  submitError?: string;
  Icon?: React.ReactNode;
}

function getSubmitErrorMessage<TFieldValues extends FieldValues>(
  errors?: FieldErrors<TFieldValues>,
  submitError?: string,
): string | undefined {
  if (typeof submitError === "string") return submitError;

  const rootMessage = errors?.root?.message;
  return typeof rootMessage === "string" ? rootMessage : undefined;
}

export default function SubmitButton<TFieldValues extends FieldValues>({
  isLoading,
  text,
  disabled,
  type = "submit",
  ariaLabel,
  className,
  errors,
  submitError,
  Icon,
}: SubmitButtonProps<TFieldValues>) {
  const errorMessage = getSubmitErrorMessage(errors, submitError);

  return (
    <div className="space-y-2">
      <button
        disabled={disabled || isLoading}
        type={type}
        className={`flex rtl:flex-row-reverse items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50 ${className ?? ""}`}
        aria-label={ariaLabel ?? text}
        aria-disabled={disabled || isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? <Loader1 className="h-4 w-4" /> : text}
        {Icon}
      </button>

      {errorMessage && (
        <p role="alert" className="text-sm text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
