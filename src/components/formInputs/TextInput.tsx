import React from "react";
import { TextFieldProps, TextField } from "@mui/material";
import { InputType } from "@types-d/enums";

interface TextInputProps extends Omit<TextFieldProps, "onChange" | "type"> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  name: string;
  type?: InputType;
  placeholder?: string;
  label?: string;
  labelStyle?: React.CSSProperties;
  errorMessage?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  onChange,
  value,
  name,
  type = "text",
  placeholder,
  errorMessage,
  ...rest
}) => {
  return (
    <TextField
      fullWidth
      slotProps={{
        input: { className: "h-12 px-4 py-2 !rounded-[8px]" },
        htmlInput: { className: "!p-0" },
      }}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      error={!!errorMessage}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default TextInput;