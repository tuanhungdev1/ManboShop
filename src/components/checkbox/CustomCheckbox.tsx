import React from "react";
import {
  Checkbox as MuiCheckbox,
  FormControlLabel,
  styled,
  CheckboxProps,
} from "@mui/material";

// Đầu tiên, sửa lại Checkbox component để nhận thêm field từ react-hook-form
interface CustomCheckboxProps
  extends Omit<CheckboxProps, "onChange" | "color"> {
  label?: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "default";

  labelStyle?: React.CSSProperties;
  disabled?: boolean;
  className?: string;
  error?: boolean;
  errorMessage?: string;
}

const StyledCheckbox = styled(MuiCheckbox, {
  shouldForwardProp: (prop) => prop !== "customColor",
})<{ customColor?: string }>(({ theme, customColor }) => ({
  "&.Mui-checked": {
    color: customColor || theme.palette.primary.main,
  },
  "&:hover": {
    backgroundColor: "transparent",
  },
}));

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  name,
  checked,
  onChange,
  color,
  labelStyle,
  disabled = false,
  className,
  ...rest
}) => {
  const renderCheckbox = () => (
    <StyledCheckbox
      checked={checked}
      onChange={onChange}
      name={name}
      customColor={color}
      disabled={disabled}
      {...rest}
    />
  );

  if (label) {
    return (
      <FormControlLabel
        control={renderCheckbox()}
        label={label}
        sx={{
          ".MuiFormControlLabel-label": {
            ...labelStyle,
            color: disabled ? "text.disabled" : "text.primary",
          },
        }}
        className={className}
      />
    );
  }

  return renderCheckbox();
};

export default CustomCheckbox;
