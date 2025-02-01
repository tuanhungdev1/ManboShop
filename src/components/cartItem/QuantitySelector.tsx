// src/components/QuantitySelector.tsx
import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onChange,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      border={1}
      borderRadius={5}
      width={"120px"}
    >
      <IconButton onClick={() => onChange(Math.max(1, quantity - 1))}>
        <RemoveIcon />
      </IconButton>
      <Typography
        variant="body1"
        sx={{ mx: 1, textAlign: "center" }}
        flexGrow={1}
      >
        {quantity}
      </Typography>
      <IconButton onClick={() => onChange(quantity + 1)}>
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default QuantitySelector;
