import { Checkbox } from "@components/checkbox";
import { SIZES } from "@constants/filters/filter";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectSizes, toggleSize } from "@redux/slices/filterSlice";
import { useState } from "react";
import { GoDash, GoPlus } from "react-icons/go";

const SizeFilter = () => {
  const dispatch = useAppDispatch();
  const selectedSizes = useAppSelector(selectSizes);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSizeChange = (sizeId: string) => {
    dispatch(toggleSize(sizeId));
  };

  const toggleAccordion = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Accordion
      expanded={isExpanded}
      onChange={toggleAccordion}
      defaultExpanded={true}
      sx={{
        boxShadow: "none",
        borderTop: isExpanded ? "none" : "0px solid #ccc",
        pt: isExpanded ? "0px" : "10px",
        pb: isExpanded ? "0px" : "10px",
      }}
    >
      <AccordionSummary
        expandIcon={
          isExpanded ? (
            <GoDash size={20} color="#000" />
          ) : (
            <GoPlus size={20} color="#000" />
          )
        }
      >
        <span className="font-medium text-[13px]">KÍCH CỠ</span>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-col gap-6">
          {SIZES.map((size) => (
            <Checkbox
              key={size.id}
              label={size.label}
              onClick={() => handleSizeChange(size.id)}
              isChecked={selectedSizes.includes(size.id)}
            />
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default SizeFilter;
