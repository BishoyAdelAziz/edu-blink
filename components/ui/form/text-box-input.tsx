import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface TextBoxInputProps<TFieldValues extends FieldValues> {
  label: string;
  placeHolder?: string;
  name: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  showLabel?: boolean;
}

export default function TextBoxInput<TFieldValues extends FieldValues>({
  label,
  placeHolder,
  name,
  register,
  errors,
  showLabel = true,
}: TextBoxInputProps<TFieldValues>) {
  const errorMessage = errors[name]?.message;

  return (
    <div className="group">
      {showLabel && (
        <label htmlFor={name} className="text-md font-semibold group-focus-within:text-2xl transition-all duration-700">
          {label}
        </label>
      )}
      <textarea
        id={name}
        rows={4}
        className="w-full min-h-24 resize-y rounded-md border-none outline-none p-2 align-top shadow-[16px_px_40px_0px_rgba(0,0,0,0.42)] "
        placeholder={placeHolder}
        {...register(name)}
        
      />
      
    </div>
  );
}
