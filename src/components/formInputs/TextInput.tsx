import React from "react";
import { TextFieldProps, TextField, Theme, SxProps } from "@mui/material";
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
  inputStyle?: SxProps<Theme>;
}

const TextInput: React.FC<TextInputProps> = ({
  onChange,
  value,
  name,
  type = "text",
  placeholder,
  errorMessage,
  inputStyle,
  ...rest
}) => {
  return (
    <TextField
      fullWidth
      slotProps={{
        input: {
          className: "h-[54px] px-4 py-3 !rounded-[6px] ",
        },
        htmlInput: { className: "!p-0" },
      }}
      sx={{
        fontSize: "10px",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#E8E8E8",
            borderWidth: "2px",
          },
          "&:hover fieldset": {
            borderColor: "#E8E8E8",
          },
          "&.Mui-focused fieldset": {
            borderColor: "black",
          },
        },
        // Label style
        "& .MuiInputLabel-root": {
          color: "black",
          fontWeight: "bold", // Making label darker/bolder
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "black",
        },
        // Input text style

        "& .MuiOutlinedInput-input": {
          fontSize: "14px",
          color: "black",
        },
        ...inputStyle,
        // Placeholder style
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
