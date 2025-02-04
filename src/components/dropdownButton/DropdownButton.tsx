import { useState } from "react";
import { Button, Menu } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export type Option = {
  id: string;
  label: string;
};

type DropdownButtonProps = {
  options: Option[];
  currentOption: string;
  defaultOption: Option;
  onOptionSelect: (option: Option) => void;
};

const DropdownButton: React.FC<DropdownButtonProps> = ({
  options,
  currentOption,
  defaultOption,
  onOptionSelect,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOption, setSelectedOption] = useState<Option>(defaultOption);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    onOptionSelect(option);
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleClick}
        sx={{
          color: "black",
          textTransform: "none",
          background: "#f9fafb",
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: 500,
          px: "20px",
        }}
      >
        <div className="flex items-center gap-3">
          <span>{selectedOption.label}</span>

          <KeyboardArrowDownIcon
            sx={{
              fontSize: "30px",
            }}
          />
        </div>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            minWidth: "200px",
            mt: 1,
            "& .MuiMenuItem-root": { typography: "body2" },
          },
        }}
      >
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => {
              handleSelect(option);
            }}
            className={`
              px-4 py-2 
              cursor-pointer 
              text-[14px] 
              font-medium
              hover:bg-gray-100 
              transition-colors
              ${currentOption === option.id ? "bg-gray-200" : ""}
            `}
          >
            {option.label}
          </div>
        ))}
      </Menu>
    </>
  );
};

export default DropdownButton;
