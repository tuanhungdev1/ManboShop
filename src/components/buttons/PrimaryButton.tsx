import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { cn } from "@utils/cn";

interface CustomButtonProps extends ButtonProps {
  className?: string;
}

const PrimaryButton: React.FC<CustomButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Button
      {...props}
      className={cn(className)}
      sx={{
        fontFamily: "Montserrat, sans-serif",
        fontSize: "14px",
        textTransform: "none",
        padding: "10px 16px",
        backgroundColor: "#110E11",
        borderRadius: 0,
        color: "#fff",
        "&:hover": {
          backgroundColor: "#292729",
        },
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
