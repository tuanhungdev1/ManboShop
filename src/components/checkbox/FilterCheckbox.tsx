import { Checkbox, FormControlLabel, styled } from "@mui/material";
import { useState } from "react";

interface FilterCheckboxProps {
  label: string;
  onChange?: (checked: boolean) => void;
  checked?: boolean;
}

const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  margin: 0,
  "&:hover .MuiCheckbox-root": {
    "& .MuiSvgIcon-root": {
      color: "black",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
  },
  "& .MuiTypography-root": {
    fontSize: "13px",
    cursor: "pointer",
    "&:hover": {
      color: "black",
    },
  },
}));

const StyledCheckbox = styled(Checkbox)(() => ({
  padding: "4px",

  "& .MuiSvgIcon-root": {
    fontSize: "20px",
    fontWidth: "10px",
    transition: "color 0.2s",
    strokeWidth: 1,
  },
  "&.Mui-checked": {
    "& .MuiSvgIcon-root": {
      color: "black",
    },
  },
  "&:hover": {
    backgroundColor: "transparent",
  },
}));

const FilterCheckbox = ({
  label,
  onChange,
  checked = false,
}: FilterCheckboxProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <StyledFormControlLabel
      control={
        <StyledCheckbox
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{
            "& .MuiSvgIcon-root": {
              color: isHovered || checked ? "black" : "rgba(0, 0, 0, 0.54)",
            },
          }}
        />
      }
      label={label}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};

export default FilterCheckbox;
