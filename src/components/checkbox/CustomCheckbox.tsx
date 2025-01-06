import React from "react";
import {
  Checkbox,
  FormControlLabel,
  FormHelperText,
  CheckboxProps,
} from "@mui/material";

interface CustomCheckboxProps extends CheckboxProps {
  label: string;
  helperText?: string;
  error?: boolean;
  containerClassName?: string;
  labelClassName?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  helperText,
  error,
  containerClassName,
  labelClassName,
  onChange,
  checked = false, // Ensure checked is always a boolean
  disabled,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event, event.target.checked);
  };

  return (
    <div className={containerClassName}>
      <FormControlLabel
        className={labelClassName}
        disabled={disabled}
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            {...props}
          />
        }
        label={label || ""}
      />
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </div>
  );
};

export default CustomCheckbox;
