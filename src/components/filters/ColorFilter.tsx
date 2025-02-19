import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { FiChevronDown } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectColors, toggleColor } from "@redux/slices/filterSlice";
import { COLORS } from "@constants/filters/filter";
import { ColorBox } from "@components/box";

const ColorFilter = () => {
  const dispatch = useAppDispatch();
  const selectedColors = useAppSelector(selectColors);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleColorChange = (colorId: string) => {
    dispatch(toggleColor(colorId));
  };

  return (
    <Accordion
      expanded={isExpanded}
      onChange={() => setIsExpanded(!isExpanded)}
      elevation={0}
      sx={{
        "&.MuiAccordion-root": {
          borderRadius: 0,
          borderBottom: "1px solid #eee",
        },
        "&.MuiAccordion-root:before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<FiChevronDown className="text-[20px] text-black" />}
        sx={{
          padding: "16px 0",
          "& .MuiAccordionSummary-content": {
            margin: 0,
          },
          "& .MuiAccordionSummary-expandIconWrapper": {
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          },
        }}
      >
        <span className="font-bold text-[18px]">Màu sắc</span>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: "0 0 16px 0" }}>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((color) => (
            <div key={color.id} className="flex flex-col items-center gap-2">
              <ColorBox
                color={color}
                isSelected={selectedColors.includes(color.label)}
                onSelectedColorBox={() => handleColorChange(color.label)}
                className="w-[24px] h-[24px] cursor-pointer hover:scale-110 transition-transform"
              />
              {/* <span className="text-[13px] text-gray-500">
                {color.label}
              </span> */}
            </div>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ColorFilter;
