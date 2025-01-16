import { ColorBox } from "@components/box";
import { COLORS } from "@constants/filters/filter";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectColors, toggleColor } from "@redux/slices/filterSlice";
import { useState } from "react";
import { GoDash, GoPlus } from "react-icons/go";


const ColorFilter = () => {
  const dispatch = useAppDispatch();
  const selectedColors = useAppSelector(selectColors);
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleAccordion = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleColorChange = (colorId: string) => {
    dispatch(toggleColor(colorId));
  };

  return (
    <Accordion
      expanded={isExpanded}
      onChange={toggleAccordion}
      defaultExpanded={true}
      sx={{
        boxShadow: "none",
        borderTop: "none",
        pt: "10px",
        pb: "10px",
      }}
    >
      <AccordionSummary
        expandIcon={isExpanded ? <GoDash size={20} color="#000" /> : <GoPlus size={20} color="#000" />}
      >
        <span className="font-medium text-[13px]">MÀU SẮC</span>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {COLORS.map((color) => (
            <ColorBox
              key={color.id}
              color={color}
              isSelected={selectedColors.includes(color.id)}
              onSelectedColorBox={() => handleColorChange(color.id)}
              className="w-[24px] h-[24px]"
            />
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ColorFilter;