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
      className={cn(className, "bg-blue-primary")}
      sx={{
        fontFamily: "Inter, sans-serif",
        fontSize: "16px",
        textTransform: "none",
        borderRadius: "8px",
        padding: "10px 16px",
        backgroundColor: "#BF272D",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#8f1c20",
        },
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
