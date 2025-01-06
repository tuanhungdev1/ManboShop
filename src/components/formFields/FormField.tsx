/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FormHelperText } from "@mui/material";
import { InputType } from "@types-d/enums";

interface ComponentProps<T extends FieldValues> {
  onChange: (...event: any[]) => void;
  value: any;
  name: string;
  type?: InputType;
  label?: string;
  placeholder?: string;
  labelStyle?: React.CSSProperties;
  control?: Control<T>;
  errorMessage?: string;
}

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  label: string;
  name: Path<T>;
  type?: InputType;
  placeholder?: string;
  labelStyle?: React.CSSProperties;
  error?: string;
  Component: React.ComponentType<ComponentProps<T>>;
}
const FormField = <T extends FieldValues>({
  control,
  label,
  name,
  type,
  placeholder,
  labelStyle,
  Component,
  error,
}: FormFieldProps<T>) => {
  return (
    <div>
      <p className="mb-1 text-sm text-dark-100 opacity-90">{label}</p>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <>
            <Component
              placeholder={placeholder}
              onChange={onChange}
              value={value}
              name={String(name)}
              type={type}
              control={control}
              labelStyle={labelStyle}
              errorMessage={error}
            />
            {error && <FormHelperText error>{error}</FormHelperText>}
          </>
        )}
      />
    </div>
  );
};

export default FormField;
