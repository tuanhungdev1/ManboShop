import React from "react";

interface TextInputProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  disabled?: boolean;
  placeholder?: string;
}

const TextField: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  name,
  disabled,
  placeholder,
}) => {
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type="text"
        id={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className=" border-black rounded-[6px] p-2 outline-none border-[2px]" // Set default border color to black
      />
    </div>
  );
};

export default TextField;
